import InitActions from "../components/InitActions";


export default {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        title: 'Home',
        handler: require('../components/Home'),
        action: InitActions.galleryPage
    },
    about: {
        path: '/about',
        method: 'get',
        page: 'about',
        title: 'About',
        handler: require('../components/About')
    }
};
