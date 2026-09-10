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
                <h3 className="font-bold text-lg text-primary">
                    Welcome to Maelstrom Matrix!
                </h3>

                <p className="pt-4">
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
                <p className="pt-4">
                    <span className="text-success">Select a challenge</span>{" "}
                    from the left sidebar, then press{" "}
                    <span className="text-success">Play</span> to view the
                    simulation! The challenges get cooler as you move on :)
                </p>
                <p className="pt-4">
                    ⭐ Please visit the{" "}
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
