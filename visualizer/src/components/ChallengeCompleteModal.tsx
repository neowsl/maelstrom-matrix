import { useEffect, useRef, type FC } from "react";
import { useMaelstromStore } from "@/lib/store";
import { CHALLENGE_IDS, type ChallengeId } from "@/lib/types";
import { ExternalLink } from "lucide-react";

const MODAL_OPEN_DELAY_MS = 1_000;

const CHAPTER_TRANSITIONS: Record<ChallengeId, string> = {
    echo: "The First Message sounded, and silence was broken. \
Long did the void answer only to its own voice. \
But now songnotes stir beyond the darkness, their identities unknown. \
These faces must be named, for to name is to know.",

    "unique-ids":
        "The messages were given names, and no two bore the same mark. \
Thus were the wanderers distinguished from one another. \
Yet each remained alone, known only to the one that first beheld it. \
What is known by one must soon be known by all.",

    broadcast:
        "Great tidings spread across the cluster. \
Through failures and sundered paths did they travel, yet they did endure. \
But footing was shattered by weeds of discord. \
A wise decision is based on knowledge and not numbers.",

    "g-counter":
        "The tally grew with no end; \
The song woven by not one, but many. \
Yet numbers are fleeting, and the past fades with memory. \
A chronicler awakes to set straight the record.",

    "kafka-log":
        "The Chronicle was forged, no message lost. \
History etched in time, but alas, memory alone brings not order. \
Now many hands seek to shape the same fate. \
The age of bargains, promises, and consequences draws near.",

    "txn-store":
        "The noise had faded from the network. \
The messages still travelled. \
The replicas still exchanged their quiet tidings. \
Yet there was no longer any struggle in their passing. \
The cluster endured... \
And for a little while, that was enough. \
Thanks for visiting! :)",
};

interface TransitionProps {
    text: string;
}

const Transition: FC<TransitionProps> = ({ text }) => {
    const sentences = text.split(". ");

    return (
        <div className="text-center italic">
            <p>"{sentences.slice(0, sentences.length - 1).join(". ")}."</p>
            <p className="mt-2 text-secondary">
                {sentences[sentences.length - 1]}
            </p>
        </div>
    );
};

const ChallengeCompleteModal: FC = () => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const challengeId = useMaelstromStore((state) => state.challengeId);
    const playbackProgress = useMaelstromStore(
        (state) => state.playbackProgress,
    );
    const setChallengeId = useMaelstromStore((state) => state.setChallengeId);

    const challengeIndex = CHALLENGE_IDS.indexOf(challengeId);
    const nextChallenge = CHALLENGE_IDS[challengeIndex + 1];

    useEffect(() => {
        const modal = modalRef.current;
        if (!modal) return;

        if (playbackProgress === 1 && !modal.open) {
            setTimeout(() => {
                modal.showModal();
                modal.focus();
            }, MODAL_OPEN_DELAY_MS);

            return;
        }

        if (playbackProgress < 1 && modal.open) {
            modal.close();
        }
    }, [playbackProgress]);

    const handleNextChallenge = () => {
        modalRef.current?.close();
        if (nextChallenge) void setChallengeId(nextChallenge);
    };

    return (
        <dialog ref={modalRef} className="modal">
            <div className="modal-box border border-success/50">
                <h3 className="font-bold text-success text-xl">
                    Challenge Complete! 😎
                </h3>

                <div className="mt-4">
                    <Transition text={CHAPTER_TRANSITIONS[challengeId]} />
                </div>

                <div className="modal-action">
                    {nextChallenge ? (
                        <button
                            className="btn btn-success"
                            type="button"
                            onClick={handleNextChallenge}
                        >
                            Take me to the next mission!
                        </button>
                    ) : (
                        <form
                            method="dialog"
                            className="flex w-full justify-center gap-4"
                        >
                            <a
                                className="btn btn-outline btn-success"
                                href="/docs"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ExternalLink />
                                Read more about the project
                            </a>
                            <button className="btn btn-outline" type="submit">
                                Close
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </dialog>
    );
};

export default ChallengeCompleteModal;
