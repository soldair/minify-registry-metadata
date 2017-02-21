"use strict"; 

// take metadata and remove anything the cli doesnt need to install it.
const keep = ['versions','time','name','_id','_rev','dist-tags', 'license' ,'repository','maintainers','author']
const versionKeep = ['name','_id','dependencies','peerDependencies','optionalDependencies','devDependencies','bundleDependencies','dist','license','version','main','scripts','bin','deprecated','man','config','preferGlobal','engines','engine-strict','_hasShrinkwrap']
const latestKeep =  ['icon','author','maintainers','homepage','keywords','description','repository']


module.exports = function(doc){
  // not registry metadata
  if(!doc) return false;

  //
  var out = {}

  for(let i = 0;i < keep.length;++i) {
    if(doc[keep[i]] !== undefined) {
      out[keep[i]] = doc[keep[i]]
    }
  }

  // versions.
  var versions = Object.keys(doc.versions)
  var smallVersions = {}
  versions.forEach(function(v){
    var version = doc.versions[v]
    var smallVersion = {}
    for(let i = 0;i < versionKeep.length;++i) {
      if(version[versionKeep[i]] !== undefined){
        smallVersion[versionKeep[i]] = version[versionKeep[i]]
      }
    }
    smallVersions[v] = smallVersion
  })
  

  var latest = doc['dist-tags'].latest
  if(latest){
    for(let i=0;i<latestKeep.length;++i){
      if(doc.versions[latest][latestKeep[i]] !== undefined) {
        smallVersions[latest][latestKeep[i]] =  doc.versions[latest][latestKeep[i]]
      }
    }
  }

  out.versions = smallVersions;

  return out
}

// tombstones?
// need to find out if the package.json that ends up in node_modules is the one from the tarball or the registry.
