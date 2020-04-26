Ext.onReady(function() {

  // import {onAdd} from './controller.js';
  // import {onDelete} from './controller.js';

  Ext.QuickTips.init();

  Ext.BLANK_IMAGE_URL = '/static/images/default/s.gif';

  var encode = true;

  var local = true;


  var filters = new Ext.ux.grid.GridFilters({
        // encode and local configuration options defined previously for easier reuse
        encode: encode, // json encode the filter query
        local: local,   // defaults to false (remote filtering)
        filters: [{
            type: 'string',
            dataIndex: 'title'
        }, {
            type: 'string',
            dataIndex: 'body',
        }, {
            type: 'list',
            dataIndex: 'category_title',
            options: ['admin_1', 'admin_2', 'admin_3', 'admin_4', 'admin_5', 'admin_6', ],
        }, {
            type: 'date',
            dataIndex: 'created'
        }, {
            type: 'boolean',
            dataIndex: 'is_favorite'
        }, {
            type: 'boolean',
            dataIndex: 'is_published'
        }]
    });


  var colModel = new Ext.grid.ColumnModel({
    defaults: {
        sortable: true,
        menuDisabled: false,
        width: 100,
    },
    columns: [
      new Ext.grid.RowNumberer(),
      {
        header: 'Title',
        dataIndex: 'title',
      }, {
        id: 'notes',
        header: 'Note',
        dataIndex: 'body',
        width: 200,
      }, {
        header: 'Category',
        dataIndex: 'category_title',
      }, {
        header: 'Created',
        dataIndex: 'created',
        xtype: 'datecolumn',
        format: 'Y-m-d H:i:s',
        width: 120,
      }, {
        header: 'Favorite',
        dataIndex: 'is_favorite',
        xtype: 'checkcolumn',
        width: 70,
      }, {
        header: 'Published',
        dataIndex: 'is_published',
        xtype: 'checkcolumn',
        width: 70,
      }
    ]
  });

  console.log('app-store:', store);
  var grid = new Ext.grid.GridPanel({
    id: 'grid A',
    store: store,
    colModel: colModel,
    title: 'Notes list',
    loadMask: true,
    plugins: [filters],
    renderTo: 'editor-grid',
    stripeRows: true,
    frame: false,
    autoExpandColumn: 'notes',
    tbar: [{
            text: 'Add',
            iconCls: 'silk-add',
            handler: onAdd,
        }, '-', {
            text: 'Delete',
            iconCls: 'silk-delete',
            handler: onDelete,
        }, '-'],
  });

  var win = new Ext.Window({
          title: '',
          height: 400,
          width: 950,
          layout: 'fit',
          items: grid
      }).show();


  var detailNotePanel = new Ext.FormPanel({
      labelAlign: 'top',
      frame:true,
      title: 'detailTitle',
      bodyStyle:'padding:5px 5px 0',
      width: 600,
      items: [{
          layout:'column',
          items:[{
              columnWidth:.5,
              layout: 'form',
              items: [{
                  xtype:'textfield',
                  fieldLabel: 'First Name',
                  name: 'first',
                  anchor:'95%'
              }, {
                  xtype:'textfield',
                  fieldLabel: 'Company',
                  name: 'company',
                  anchor:'95%'
              }]
          },{
              columnWidth:.5,
              layout: 'form',
              items: [{
                  xtype:'textfield',
                  fieldLabel: 'Last Name',
                  name: 'last',
                  anchor:'95%'
              },{
                  xtype:'textfield',
                  fieldLabel: 'Email',
                  name: 'email',
                  vtype:'email',
                  anchor:'95%'
              }]
          }]
      },{
          xtype:'htmleditor',
          id:'bio',
          fieldLabel:'Biography',
          height:200,
          anchor:'98%'
      }],

      buttons: [{
          text: 'Save'
      },{
          text: 'Cancel'
      }]
  });

  // detailNotePanel.render(document.body);

  /**
  * onAdd
  */
  function onAdd() {
    var rec = grid.getSelectionModel().getSelected();
    // if (!rec) {return false;}
    alert(rec.data);
    console.log(rec.data);
    // detailWin.show();
  }

  /**
  * onDelete
  */
  function onDelete() {
    var rec = grid.getSelectionModel().getSelected();
    // if (!rec) {
    //     return false;
    // }
    alert(rec.data);
    console.log(rec)
  }


});
