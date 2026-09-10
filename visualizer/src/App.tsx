import type { FC } from "react";
import ChallengeCompleteModal from "./components/ChallengeCompleteModal";
import { MaelstromCanvas } from "./components/MaelstromCanvas";
import ResponsiveGuardModal from "./components/ResponsiveGuard";
import SidebarLeft from "./components/SidebarLeft";
import SidebarRight from "./components/SidebarRight";
import WelcomeModal from "./components/WelcomeModal";

const App: FC = () => {
    return (
        <>
            <div className="drawer lg:drawer-open">
                <input
                    id="sidebar-left"
                    type="checkbox"
                    className="drawer-toggle"
                />

                <div className="drawer-content">
                    <div className="drawer drawer-end lg:drawer-open">
                        <input
                            id="sidebar-right"
                            type="checkbox"
                            className="drawer-toggle"
                        />

                        <div className="drawer-content">
                            <MaelstromCanvas />
                        </div>

                        <SidebarRight />
                    </div>
                </div>

                <SidebarLeft />
            </div>

            <WelcomeModal />
            <ChallengeCompleteModal />

            <ResponsiveGuardModal />
        </>
    );
};

export default App;
