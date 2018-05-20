import Component from '@ember/component';
import swal from 'sweetalert';
export default Component.extend({
    tableLoading: true,
    didInsertElement() {
        this.set('currentUser', this.get('currentUser'))
        this.store.findAll('MProperty').then(
            success => {
                this.set('tableLoading', false)
                this.set('properties', success)
            }
        );
    },
    actions: {
        deleteProperty(id) {
           var self = this;
            swal({
                title: "هل أنت متأكد",
                text: "لايمكنك استرجاع هذا العقار",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "نعم",
                cancelButtonText: "إلغاء",
                closeOnConfirm: true,
                closeOnCancel: true
            },
                function (isConfirm) {
                    if (isConfirm) {
                        new Ember.RSVP.Promise(function (resolve, reject) {
                            self.manager.ajaxRequest(self, self.get('urls').updateProperty(id)+ "/destroy", 'DELETE', resolve, reject);
                        }).then(
                            success => {
                               let property =  self.store.peekRecord('mproperty', id);
                               self.store.unloadRecord(property);
                               self.manager.toaster(self, 'تم حذف العقار بنجاح   ')

                            },
                            errors => {
                                console.log(errors)
                            }
                        )
                    }
                })


        },
        rentAction() {

        },
        propertyView(id) {
            this.get('router').transitionTo('index.properties.show.property-data', id)
        },
        editProperty(id) {
            this.get('router').transitionTo('index.properties.edit.status', id)
        },
        addProperty() {
            this.get('router').transitionTo('index.properties.add.property-data')
        }
    }
});
