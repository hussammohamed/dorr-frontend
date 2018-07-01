import Route from '@ember/routing/route';

export default Route.extend({
    breadCrumb: {
        title: "طلبات التحصيل",
        linkable: true,
        path: "index.properties.show.collection-requests.lists.pending"
    },
});

