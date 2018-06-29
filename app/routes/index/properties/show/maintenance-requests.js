import Route from '@ember/routing/route';

export default Route.extend({
    breadCrumb: {
        title: "طلبات الصيانة",
        linkable: true,
        path: "index.properties.show.maintenance-requests.lists.pending"
    },
});
