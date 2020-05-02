//dependencies
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//components
import Navbar from './Components/Globals/Navbar/Navbar'
import Sidebar from './Components/Globals/Sidebar/Sidebar'
import GenericPage from './Components/Layouts/GenericPage'
import StatusPage from './Components/Layouts/StatusPage/StatusPage'
import ScanTypesPage from './Components/Layouts/ScanTypesPage/ScanTypesPage'
import ScanPage from './Components/Layouts/ScanPage/ScanPage'
//pages data
import pagesData from './Data/appData'
//context
import ScanContextProvider from './Context/scanContext'

const App = () => {
    return (
        <ScanContextProvider> 
            <Router>
                <div className="dashboard">
                    <Navbar />
                    <div className="dashboard__main">
                        <Sidebar />
                        <Switch>
                            <Route path="/status" render = {() => <StatusPage /> }/>
                            <Route path="/protection" render = {() => <GenericPage data={pagesData['protectionPageData']} />}/>
                            <Route path="/privacy" render = {() => <GenericPage data={pagesData['privacyPageData']} />}/>
                            <Route path="/performance" render = {() => <GenericPage data={pagesData['performancePageData']} />}/>
                            <Route path="/scantypes" render = {() => <ScanTypesPage />}/>
                            <Route path="/scan/:scanType" render = {() => <ScanPage />}/>
                            <Route path="/scan" render = {() => <ScanPage />}/>
                            <Route path="*" render = {() => <StatusPage /> }/>
                        </Switch>
                    </div>
                </div>
            </Router>
        </ScanContextProvider>
    )
}

export default App