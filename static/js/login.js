/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.onReady(function(){

    // Ext.require(["Ext.util.Cookies", "Ext.Ajax"], function(){
    // // Add csrf token to every ajax request
    // var token = Ext.util.Cookies.get('csrftoken');
    // if(!token){
    //     Ext.Error.raise("Missing csrftoken cookie");
    // } else {
    //     Ext.Ajax.defaultHeaders = Ext.apply(Ext.Ajax.defaultHeaders || {}, {
    //         'X-CSRFToken': token
    //     });
    // }
    // });

    var token = Ext.util.Cookies.get('csrftoken');
    console.log('token:', token)

    Ext.QuickTips.init();

    // turn on validation errors beside the field globally
    Ext.form.Field.prototype.msgTarget = 'side';

    var bd = Ext.getBody();

    /*
     * ================  Simple form  =======================
     */
    bd.createChild({tag: 'h1', html: 'Login Form'});


    var login = new Ext.FormPanel({
        labelWidth: 75, // label settings here cascade unless overridden
        frame:true,
        title: 'Login',
        bodyStyle:'padding:5px 5px 0',
        width: 350,
        defaults: {width: 230},
        defaultType: 'textfield',

        items: [{
                fieldLabel: 'First Name',
                name: 'username',
                allowBlank:false
            },{
                fieldLabel: 'Password',
                name: 'password',
                inputType: 'password',
                allowBlank: false
            }
        ],

        buttons: [{
            text: 'Login',
            handler: function(){
              login.getForm().submit({
                url:'/accounts/login/auth/',
                headers:{
                  "Accept": "application/json",
                  "X-CSRFToken": token
                },
                success: function(form, action) {
                  Ext.Msg.alert('Success', action.result.msg);
                  login.hide();
                  document.location.href = '/notes/index/';
                },
                failure: function(form, action) {
                  switch (action.failureType) {
                    case Ext.form.Action.CLIENT_INVALID:
                      Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                      break;
                    case Ext.form.Action.CONNECT_FAILURE:
                      Ext.Msg.alert('Failure', 'Ajax communication failed');
                      break;
                    case Ext.form.Action.SERVER_INVALID:
                      Ext.Msg.alert('Failure', action.result.msg);
                  }
                }
              });
          // console.log('login:', login.getForm().username)
        }
        },{
            text: 'Cancel',
            handler: function(){
              login.hide()
            }
        },{
            text: 'Sign Up',
            handler: function() {
              // login.hide();
              // Ext.Msg.alert('Alert', 'Sign Up Form must be here!');

              document.location.href = '/accounts/registration/'
            }
        }]
    });

    login.render(document.body);

});
