
var store = new Ext.data.JsonStore({
  // store configs
  autoLoad: true,
  autoDestroy: true,
  proxy : new Ext.data.HttpProxy({
      method: 'GET',
      prettyUrls: false,
      url: '/notes/note_list_test/', // see options parameter for Ext.Ajax.request
      // api: {
      //     // all actions except the following will use above url
      //     create  : 'local/new.php',
      //     update  : 'local/update.php'
      // }
  }),
  storeId: 'myStore',
  // reader configs
  root: 'data',
  idProperty: 'uuid',
  // totalProperty: 'total',
  remoteSort: false,
  fields: [
    'title',
    'body',
    {name: 'created', type: 'date'},
    {name:'is_favorite', type:'bool'},
    {name: 'is_published', type: 'bool'},
    'category_title',
    'uuid'],
  writer: 'json',
  sortInfo: {field: 'created', direction: 'DESC'}
});
store.load();
console.log(store);
