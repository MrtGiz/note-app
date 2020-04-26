function noteDetail() {
  var top = new Ext.FormPanel({
      labelAlign: 'top',
      frame:true,
      title: 'Edit note',
      bodyStyle:'padding:5px 5px 0',
      width: 600,
      items: [{
          layout:'column',
          items:[{
              columnWidth:.5,
              layout: 'form',
              items: [{
                  xtype:'textfield',
                  fieldLabel: 'Title',
                  name: 'title',
                  anchor:'95%'
              }, {
                  xtype: 'combo',
                  store: ['Notice', 'Reference', 'Reminder', 'TODO' ],
                  plugins: [Ext.ux.FieldLabeler ],
                  fieldLabel: 'Category',
                  dataIndex: 'category',
                  name: 'category',
                  anchor:'95%'
              }]
          },{
              columnWidth:.5,
              layout: 'form',
              items: [{
                  xtype: 'checkbox',
                  fieldLabel: 'Add to favorite',
                  name: 'is_favorite',
                  anchor:'95%'
              },{
                  xtype: 'checkbox',
                  fieldLabel: 'Publish',
                  name: 'is_published',
                  anchor:'95%'
              }]
          }]
      },{
          xtype:'htmleditor',
          id:'note_text',
          fieldLabel:'Note text',
          height:200,
          anchor:'98%'
      }],

      buttons: [{
          text: 'Save'
      },{
          text: 'Cancel'
      }]
  });

  // top.render(document.body);

  var win = new Ext.Window({
          title: '',
          height: 450,
          width: 600,
          layout: 'fit',
          items: top,
      }).show();

}


/**
* onAdd
*/
function onAdd() {
  var rec = grid.getSelectionModel().getSelected();
  // if (!rec) {return false;}
  alert(rec.data);
  console.log(noteDetail);
  noteDetail();
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
