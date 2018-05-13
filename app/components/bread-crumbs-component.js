import Component from '@ember/component';
const {
    get,
    computed,
    copy,
    getWithDefault,
    assert,
    deprecate,
    isPresent,
    typeOf,
    setProperties,
    getOwner,
    A: emberArray,
    String: { classify }
} = Ember;
const {
    bool,
    readOnly
} = computed;
export default Component.extend({
    currentUrl: readOnly('applicationRoute.router.url'),
    currentRouteName: readOnly('applicationRoute.controller.currentRouteName'),
    routeHierarchy: computed('currentUrl', 'currentRouteName', 'reverse', {
        get() {
            const currentRouteName = getWithDefault(this, 'currentRouteName', false);
            const routeNames = currentRouteName.split('.');
            const filteredRouteNames = this._filterIndexAndLoadingRoutes(routeNames);
            const crumbs = this._lookupBreadCrumb(routeNames, filteredRouteNames);
            return get(this, 'reverse') ? crumbs.reverse() : crumbs;
        }
    }).readOnly(),
    _filterIndexAndLoadingRoutes(routeNames) {
        return routeNames.filter((name) => !( name === 'loading'));
    },
    _lookupBreadCrumb(routeNames, filteredRouteNames) {
        const defaultLinkable = get(this, 'linkable');
        const pathLength = filteredRouteNames.length;
        const breadCrumbs = emberArray();

        filteredRouteNames.map((name, index) => {
            let path = this._guessRoutePath(routeNames, name, index);
            const route = this._lookupRoute(path);
            const isHead = index === 0;
            const isTail = index === pathLength - 1;

            const crumbLinkable = (index === pathLength - 1) ? false : defaultLinkable;


            const multipleBreadCrumbs = route.get('breadCrumbs');

            if (multipleBreadCrumbs) {
                multipleBreadCrumbs.forEach((breadCrumb) => {
                    breadCrumbs.pushObject(breadCrumb);
                });
            } else {
                let breadCrumb = copy(getWithDefault(route, 'breadCrumb', {
                    title: classify(name)
                }));

                if (typeOf(breadCrumb) === 'null') {
                    return;
                } else {
                    if (isPresent(breadCrumb.path)) {
                        path = breadCrumb.path;
                    }

                    setProperties(breadCrumb, {
                        path,
                        isHead,
                        isTail,
                        linkable: breadCrumb.hasOwnProperty('linkable') ? breadCrumb.linkable : crumbLinkable
                    });
                }

                breadCrumbs.pushObject(breadCrumb);
            }

        });

        return emberArray(breadCrumbs.filter((breadCrumb) => typeOf(breadCrumb) !== 'undefined'));
    },
    _lookupRoute(routeName) {
       
        let routeNameArray =  routeName.split(".");
       if(routeNameArray[0] == 'index'){
        return getOwner(this).lookup(`route:${routeName}`);
       }
        return getOwner(this).lookup(`route:${'index.' + routeName}`);
    },
    _guessRoutePath(routeNames, name, index) {
        const routes = routeNames.slice(0, index + 1);

        if (routes.length === 1) {
            let path = `${name}.index`;

            return (this._lookupRoute(path)) ? path : name;
        }

        return routes.join('.');
    },

    didInsertElement() {
        var self = this;
    }
});
