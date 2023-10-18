import React, {useRef} from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import FeaturesPage from "./components/FeaturesPage";
import DiscoverPage from "./components/DiscoverPage";
import DoMorePage from "./components/DoMorePage";
import LaunchPage from "./components/LaunchPage";
import CreateAccountPage from "./components/CreateAccountPage";
import WhatClientSayPage from "./components/WhatClientSayPage";
import ScreenshotsPage from "./components/ScreenshotsPage";
import UpgradePage from "./components/UpgradePage";
import FaqPage from "./components/FaqPage";
import DownloadPage from "./components/DownloadPage";

const App = ()=> {
    const myRef = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null),];
    const watchRef = useRef(null);

  return (
      <div className="app">
        <Header mainRef={myRef} watchRef={watchRef}/>
        <main className="main">
            <HomePage myRef={myRef[0]} watchRef={watchRef}/>
            <FeaturesPage myRef={myRef[1]}/>
            <DiscoverPage/>
            <DoMorePage/>
            <LaunchPage/>
            <CreateAccountPage/>
            <WhatClientSayPage/>
            <ScreenshotsPage myRef={myRef[2]}/>
            <UpgradePage myRef={myRef[3]}/>
            <FaqPage/>
            <DownloadPage/>
        </main>
        <Footer myRef={myRef[4]}/>
      </div>
  );
}

export default App;
