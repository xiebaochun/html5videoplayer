;
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem; 

navigator.webkitPersistentStorage.requestQuota(1024*1024, function(grantedBytes) {
  window.webkitRequestFileSystem(window.PERSISTENT, grantedBytes, onInitFs, errorHandler);
}, function(e) {
  console.log('Error', e);
});


 function toArray(list) {  
  return Array.prototype.slice.call(list || [], 0);  
}  
  
function listResults(entries) {  
  // Document fragments can improve performance since they're only appended  
  // to the DOM once. Only one browser reflow occurs.  
  var fragment = document.createDocumentFragment();  
  
  entries.forEach(function(entry, i) {  
    var img = entry.isDirectory ? '<img src="Images/folder-icon.gif">' :  
                                  '<img src="Images/file-icon.gif">';  
    var li = document.createElement('li');  
    li.innerHTML = [img, '<span>', entry.name, '</span>'].join('');  
    fragment.appendChild(li);  
  });  
  
  //document.querySelector('#filelist').appendChild(fragment); 
  //$('#filelist').appendChild(fragment); 
  //alert('path: ' + entries[0].fullPath );
}  
  
function onInitFs(fs) {  

 //fs.root.getDirectory('myDirext');
  createDir(fs.root, 'Videos/Images/Nature/Sky/'.split('/'));
  ///////ceate file
   for(var i=0;i<10;i++){
   fs.root.getFile('log'+i+'.txt', {create: true, exclusive: true}, function(fileEntry) {
     // fileEntry.isFile === true
     // fileEntry.name == 'log.txt'
     // fileEntry.fullPath == '/log.txt'

       }, errorHandler);
   }

  var dirReader = fs.root.createReader();  
  var entries = [];  
  

  // Call the reader.readEntries() until no more results are returned.  
  var readEntries = function() {  
     dirReader.readEntries (function(results) {  
      if (!results.length) {  
        listResults(entries.sort());  
      } else {  
        entries = entries.concat(toArray(results));  
        readEntries();  
      }  
    }, errorHandler);  
  };  
  
  readEntries(); // Start reading dirs.  

   //alert('Opened file system: ' + fs.name );
 

}  
  
   
    //window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);  

function errorHandler(e) {  
  var msg = '';  
  
  switch (e.code) {  
    case FileError.QUOTA_EXCEEDED_ERR:  
      msg = 'QUOTA_EXCEEDED_ERR';  
      break;  
    case FileError.NOT_FOUND_ERR:  
      msg = 'NOT_FOUND_ERR';  
      break;  
    case FileError.SECURITY_ERR:  
      msg = 'SECURITY_ERR';  
      break;  
    case FileError.INVALID_MODIFICATION_ERR:  
      msg = 'INVALID_MODIFICATION_ERR';  
      break;  
    case FileError.INVALID_STATE_ERR:  
      msg = 'INVALID_STATE_ERR';  
      break;  
    default:  
      msg = 'Unknown Error';  
      break;  
  };  
  
  console.log('Error: ' + msg);  
}  


////create file Directory

function createDir(rootDir, folders) {
  rootDir.getDirectory(folders[0], {create: true}, function(dirEntry) {
    if (folders.length) {
      createDir(dirEntry, folders.slice(1));
    }
  }, errorHandler);
};
