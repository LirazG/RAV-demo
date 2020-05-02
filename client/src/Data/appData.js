function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const protectionPageData = [
    {header: 'Scan', text: 'Choose the best scan for your needs', link: "/scantypes", type:'scan'},
    {header: 'Anti-ransomware', text: 'Blocks ransomware from encrypting your files', locked: true, link: "/"},
    {header: 'IoT', text: 'Detects devices on your network that may be vulnerable', disabled: true, link: "/"},
    {header: 'Extension guard', text: 'Detects malicious browser extensions', disabled: true, link: "/"}
];

const privacyPageData = [
    {header: 'Camera protection', text: 'block intruders from  accessing your webcam', locked: true, link: "/"},
    {header: 'Microphone protection', text: 'Keeps unauthorized parties from using your microphone', locked: true, link: "/"},
    {header: 'Anti-ransomware', text: 'Blocks ransomware from encrypting your files', locked: true, link: "/"},
    {header: 'Phishing protection', text: 'Detects phishing scams', disabled: true, link: "/"},
    {header: 'Tracking protection', text: 'Prevents third-parties from tracking your data', disabled: true, link: "/"}
];

const performancePageData = [
    {header: 'Should I remove it?', text: 'Notifies you regarding the security and reliability of your downloads', locked: true, link: "/"},
    {header: 'Tuneup', text: 'keeps ypur PC runing like new', disabled: true, link: "/"}
];

const protectionPageImages = importAll(require.context('../Assets/Images/Protection_page', false, /\.(png|jpe?g|svg)$/));
const privacyPageImages = importAll(require.context('../Assets/Images/Privacy_page', false, /\.(png|jpe?g|svg)$/));
const performancePageImages = importAll(require.context('../Assets/Images/Performance_page', false, /\.(png|jpe?g|svg)$/));

Object.keys(protectionPageImages).map( (key, index) => {
    protectionPageData[index].image = protectionPageImages[key]
});

Object.keys(privacyPageImages).map( (key, index) => {
    privacyPageData[index].image = privacyPageImages[key]
});

Object.keys(performancePageImages).map( (key, index) => {
    performancePageData[index].image = performancePageImages[key]
});

const pagesData = {
    protectionPageData,
    privacyPageData,
    performancePageData
}

export default pagesData

