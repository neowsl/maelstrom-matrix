import { useEffect, useRef, type FC } from "react";

const WelcomeModal: FC = () => {
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        modalRef.current?.showModal();
        modalRef.current?.focus();
    }, []);

    return (
        <dialog ref={modalRef} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-primary text-xl">
                    Welcome to Maelstrom Matrix!
                </h3>

                <p className="mt-4">
                    This app is a visualiser for exploring inter-node gossip in
                    my hand-rolled Golang solutions to the{" "}
                    <a
                        className="link link-secondary"
                        href="https://fly.io/dist-sys"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Gossip Glomers
                    </a>{" "}
                    distributed systems challenges.
                </p>
                <p className="mt-4">
                    Press <span className="font-bold text-success">Play</span>{" "}
                    on the right sidebar to begin the simulation!
                </p>
                <p className="mt-4">
                    ⭐ Visit the{" "}
                    <a
                        className="link link-secondary"
                        href="/docs"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Maelstrom docs
                    </a>{" "}
                    to read my engineering journal and see in-depth explanations
                    of distributed systems concepts!
                </p>

                <div className="modal-action">
                    <form method="dialog">
                        <button
                            className="btn btn-outline btn-primary"
                            type="submit"
                        >
                            Let's dive in!
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default WelcomeModal;
