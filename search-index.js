var searchIndex = {};
searchIndex["fuse"] = {"doc":"","items":[[3,"ReplyEmpty","fuse","",null,null],[3,"ReplyData","","",null,null],[3,"ReplyEntry","","",null,null],[3,"ReplyAttr","","",null,null],[3,"ReplyOpen","","",null,null],[3,"ReplyWrite","","",null,null],[3,"ReplyStatfs","","",null,null],[3,"ReplyCreate","","",null,null],[3,"ReplyLock","","",null,null],[3,"ReplyBmap","","",null,null],[3,"ReplyDirectory","","",null,null],[3,"ReplyXTimes","","",null,null],[3,"Request","","Request data structure",null,null],[3,"Session","","The session data structure",null,null],[12,"filesystem","","Filesystem operation implementations",0,null],[12,"proto_major","","FUSE protocol major version",0,null],[12,"proto_minor","","FUSE protocol minor version",0,null],[12,"initialized","","True if the filesystem is initialized (init operation done)",0,null],[12,"destroyed","","True if the filesystem was destroyed (destroy operation done)",0,null],[3,"BackgroundSession","","The background session data structure",null,null],[12,"mountpoint","","Path of the mounted filesystem",1,null],[12,"guard","","Thread guard of the background session",1,null],[3,"FileAttr","","File attributes",null,null],[12,"ino","","Inode number",2,null],[12,"size","","Size in bytes",2,null],[12,"blocks","","Size in blocks",2,null],[12,"atime","","Time of last access",2,null],[12,"mtime","","Time of last modification",2,null],[12,"ctime","","Time of last change",2,null],[12,"crtime","","Time of creation (OS X only)",2,null],[12,"kind","","Kind of file (directory, file, pipe, etc)",2,null],[12,"perm","","Permissions",2,null],[12,"nlink","","Number of hard links",2,null],[12,"uid","","User id",2,null],[12,"gid","","Group id",2,null],[12,"rdev","","Rdev",2,null],[12,"flags","","Flags (OS X only, see chflags(2))",2,null],[4,"FileType","","File types",null,null],[13,"NamedPipe","","Named pipe (S_IFIFO)",3,null],[13,"CharDevice","","Character device (S_IFCHR)",3,null],[13,"BlockDevice","","Block device (S_IFBLK)",3,null],[13,"Directory","","Directory (S_IFDIR)",3,null],[13,"RegularFile","","Regular file (S_IFREG)",3,null],[13,"Symlink","","Symbolic link (S_IFLNK)",3,null],[5,"mount","","Mount the given filesystem to the given mountpoint. This function will\nnot return until the filesystem is unmounted.",null,null],[5,"spawn_mount","","Mount the given filesystem to the given mountpoint. This function spawns\na background thread to handle filesystem operations while being mounted\nand therefore returns immediately. The returned handle should be stored\nto reference the mounted filesystem. If it&#39;s dropped, the filesystem will\nbe unmounted.",null,null],[0,"consts","","",null,null],[17,"FATTR_MODE","fuse::consts","",null,null],[17,"FATTR_UID","","",null,null],[17,"FATTR_GID","","",null,null],[17,"FATTR_SIZE","","",null,null],[17,"FATTR_ATIME","","",null,null],[17,"FATTR_MTIME","","",null,null],[17,"FATTR_FH","","",null,null],[17,"FATTR_CRTIME","","",null,null],[17,"FATTR_CHGTIME","","",null,null],[17,"FATTR_BKUPTIME","","",null,null],[17,"FATTR_FLAGS","","",null,null],[17,"FOPEN_DIRECT_IO","","",null,null],[17,"FOPEN_KEEP_CACHE","","",null,null],[17,"FOPEN_PURGE_ATTR","","",null,null],[17,"FOPEN_PURGE_UBC","","",null,null],[17,"FUSE_ASYNC_READ","","",null,null],[17,"FUSE_POSIX_LOCKS","","",null,null],[17,"FUSE_FILE_OPS","","",null,null],[17,"FUSE_ATOMIC_O_TRUNC","","",null,null],[17,"FUSE_EXPORT_SUPPORT","","",null,null],[17,"FUSE_BIG_WRITES","","",null,null],[17,"FUSE_DONT_MASK","","",null,null],[17,"FUSE_CASE_INSENSITIVE","","",null,null],[17,"FUSE_VOL_RENAME","","",null,null],[17,"FUSE_XTIMES","","",null,null],[17,"FUSE_RELEASE_FLUSH","","",null,null],[11,"fmt","alloc::boxed","",4,null],[11,"fmt","fuse","",5,null],[11,"new","","",5,{"inputs":[{"name":"u64"},{"name":"s"}],"output":{"name":"replyempty"}}],[11,"ok","","Reply to a request with nothing",5,null],[11,"error","","Reply to a request with the given error code",5,null],[11,"fmt","","",6,null],[11,"new","","",6,{"inputs":[{"name":"u64"},{"name":"s"}],"output":{"name":"replydata"}}],[11,"data","","Reply to a request with the given data",6,null],[11,"error","","Reply to a request with the given error code",6,null],[11,"fmt","","",7,null],[11,"new","","",7,{"inputs":[{"name":"u64"},{"name":"s"}],"output":{"name":"replyentry"}}],[11,"entry","","Reply to a request with the given entry",7,null],[11,"error","","Reply to a request with the given error code",7,null],[11,"fmt","","",8,null],[11,"new","","",8,{"inputs":[{"name":"u64"},{"name":"s"}],"output":{"name":"replyattr"}}],[11,"attr","","Reply to a request with the given attribute",8,null],[11,"error","","Reply to a request with the given error code",8,null],[11,"fmt","","",9,null],[11,"new","","",9,{"inputs":[{"name":"u64"},{"name":"s"}],"output":{"name":"replyxtimes"}}],[11,"xtimes","","Reply to a request with the given xtimes",9,null],[11,"error","","Reply to a request with the given error code",9,null],[11,"fmt","","",10,null],[11,"new","","",10,{"inputs":[{"name":"u64"},{"name":"s"}],"output":{"name":"replyopen"}}],[11,"opened","","Reply to a request with the given open result",10,null],[11,"error","","Reply to a request with the given error code",10,null],[11,"fmt","","",11,null],[11,"new","","",11,{"inputs":[{"name":"u64"},{"name":"s"}],"output":{"name":"replywrite"}}],[11,"written","","Reply to a request with the given open result",11,null],[11,"error","","Reply to a request with the given error code",11,null],[11,"fmt","","",12,null],[11,"new","","",12,{"inputs":[{"name":"u64"},{"name":"s"}],"output":{"name":"replystatfs"}}],[11,"statfs","","Reply to a request with the given open result",12,null],[11,"error","","Reply to a request with the given error code",12,null],[11,"fmt","","",13,null],[11,"new","","",13,{"inputs":[{"name":"u64"},{"name":"s"}],"output":{"name":"replycreate"}}],[11,"created","","Reply to a request with the given entry",13,null],[11,"error","","Reply to a request with the given error code",13,null],[11,"fmt","","",14,null],[11,"new","","",14,{"inputs":[{"name":"u64"},{"name":"s"}],"output":{"name":"replylock"}}],[11,"locked","","Reply to a request with the given open result",14,null],[11,"error","","Reply to a request with the given error code",14,null],[11,"fmt","","",15,null],[11,"new","","",15,{"inputs":[{"name":"u64"},{"name":"s"}],"output":{"name":"replybmap"}}],[11,"bmap","","Reply to a request with the given open result",15,null],[11,"error","","Reply to a request with the given error code",15,null],[11,"fmt","","",16,null],[11,"new","","Creates a new ReplyDirectory with a specified buffer size.",16,{"inputs":[{"name":"u64"},{"name":"s"},{"name":"usize"}],"output":{"name":"replydirectory"}}],[11,"add","","Add an entry to the directory reply buffer. Returns true if the buffer is full.\nA transparent offset value can be provided for each entry. The kernel uses these\nvalue to request the next entries in further readdir calls",16,null],[11,"ok","","Reply to a request with the filled directory buffer",16,null],[11,"error","","Reply to a request with the given error code",16,null],[11,"fmt","","",17,null],[11,"unique","","Returns the unique identifier of this request",17,null],[11,"uid","","Returns the uid of this request",17,null],[11,"gid","","Returns the gid of this request",17,null],[11,"pid","","Returns the pid of this request",17,null],[11,"fmt","","",0,null],[11,"new","","Create a new session by mounting the given filesystem to the given mountpoint",0,null],[11,"mountpoint","","Return path of the mounted filesystem",0,null],[11,"run","","Run the session loop that receives kernel requests and dispatches them to method\ncalls into the filesystem. This read-dispatch-loop is non-concurrent to prevent\nhaving multiple buffers (which take up much memory), but the filesystem methods\nmay run concurrent by spawning threads.",0,null],[11,"spawn","","Run the session loop in a background thread",0,null],[11,"drop","","",0,null],[11,"new","","Create a new background session for the given session by running its\nsession loop in a background thread. If the returned handle is dropped,\nthe filesystem is unmounted and the given session ends.",1,{"inputs":[{"name":"session"}],"output":{"name":"result"}}],[11,"drop","","",1,null],[11,"fmt","","",1,null],[17,"FUSE_ROOT_ID","","",null,null],[8,"Reply","","Generic reply trait",null,null],[10,"new","","Create a new reply for the given request",18,{"inputs":[{"name":"u64"},{"name":"s"}],"output":{"name":"self"}}],[8,"Filesystem","","Filesystem trait.",null,null],[11,"init","","Initialize filesystem\nCalled before any other filesystem method.",19,null],[11,"destroy","","Clean up filesystem\nCalled on filesystem exit.",19,null],[11,"lookup","","Look up a directory entry by name and get its attributes.",19,null],[11,"forget","","Forget about an inode\nThe nlookup parameter indicates the number of lookups previously performed on\nthis inode. If the filesystem implements inode lifetimes, it is recommended that\ninodes acquire a single reference on each lookup, and lose nlookup references on\neach forget. The filesystem may ignore forget calls, if the inodes don&#39;t need to\nhave a limited lifetime. On unmount it is not guaranteed, that all referenced\ninodes will receive a forget message.",19,null],[11,"getattr","","Get file attributes",19,null],[11,"setattr","","Set file attributes",19,null],[11,"readlink","","Read symbolic link",19,null],[11,"mknod","","Create file node\nCreate a regular file, character device, block device, fifo or socket node.",19,null],[11,"mkdir","","Create a directory",19,null],[11,"unlink","","Remove a file",19,null],[11,"rmdir","","Remove a directory",19,null],[11,"symlink","","Create a symbolic link",19,null],[11,"rename","","Rename a file",19,null],[11,"link","","Create a hard link",19,null],[11,"open","","Open a file\nOpen flags (with the exception of O_CREAT, O_EXCL, O_NOCTTY and O_TRUNC) are\navailable in flags. Filesystem may store an arbitrary file handle (pointer, index,\netc) in fh, and use this in other all other file operations (read, write, flush,\nrelease, fsync). Filesystem may also implement stateless file I/O and not store\nanything in fh. There are also some flags (direct_io, keep_cache) which the\nfilesystem may set, to change the way the file is opened. See fuse_file_info\nstructure in &lt;fuse_common.h&gt; for more details.",19,null],[11,"read","","Read data\nRead should send exactly the number of bytes requested except on EOF or error,\notherwise the rest of the data will be substituted with zeroes. An exception to\nthis is when the file has been opened in &#39;direct_io&#39; mode, in which case the\nreturn value of the read system call will reflect the return value of this\noperation. fh will contain the value set by the open method, or will be undefined\nif the open method didn&#39;t set any value.",19,null],[11,"write","","Write data\nWrite should return exactly the number of bytes requested except on error. An\nexception to this is when the file has been opened in &#39;direct_io&#39; mode, in\nwhich case the return value of the write system call will reflect the return\nvalue of this operation. fh will contain the value set by the open method, or\nwill be undefined if the open method didn&#39;t set any value.",19,null],[11,"flush","","Flush method\nThis is called on each close() of the opened file. Since file descriptors can\nbe duplicated (dup, dup2, fork), for one open call there may be many flush\ncalls. Filesystems shouldn&#39;t assume that flush will always be called after some\nwrites, or that if will be called at all. fh will contain the value set by the\nopen method, or will be undefined if the open method didn&#39;t set any value.\nNOTE: the name of the method is misleading, since (unlike fsync) the filesystem\nis not forced to flush pending writes. One reason to flush data, is if the\nfilesystem wants to return write errors. If the filesystem supports file locking\noperations (setlk, getlk) it should remove all locks belonging to &#39;lock_owner&#39;.",19,null],[11,"release","","Release an open file\nRelease is called when there are no more references to an open file: all file\ndescriptors are closed and all memory mappings are unmapped. For every open\ncall there will be exactly one release call. The filesystem may reply with an\nerror, but error values are not returned to close() or munmap() which triggered\nthe release. fh will contain the value set by the open method, or will be undefined\nif the open method didn&#39;t set any value. flags will contain the same flags as for\nopen.",19,null],[11,"fsync","","Synchronize file contents\nIf the datasync parameter is non-zero, then only the user data should be flushed,\nnot the meta data.",19,null],[11,"opendir","","Open a directory\nFilesystem may store an arbitrary file handle (pointer, index, etc) in fh, and\nuse this in other all other directory stream operations (readdir, releasedir,\nfsyncdir). Filesystem may also implement stateless directory I/O and not store\nanything in fh, though that makes it impossible to implement standard conforming\ndirectory stream operations in case the contents of the directory can change\nbetween opendir and releasedir.",19,null],[11,"readdir","","Read directory\nSend a buffer filled using buffer.fill(), with size not exceeding the\nrequested size. Send an empty buffer on end of stream. fh will contain the\nvalue set by the opendir method, or will be undefined if the opendir method\ndidn&#39;t set any value.",19,null],[11,"releasedir","","Release an open directory\nFor every opendir call there will be exactly one releasedir call. fh will\ncontain the value set by the opendir method, or will be undefined if the\nopendir method didn&#39;t set any value.",19,null],[11,"fsyncdir","","Synchronize directory contents\nIf the datasync parameter is set, then only the directory contents should\nbe flushed, not the meta data. fh will contain the value set by the opendir\nmethod, or will be undefined if the opendir method didn&#39;t set any value.",19,null],[11,"statfs","","Get file system statistics",19,null],[11,"setxattr","","Set an extended attribute",19,null],[11,"getxattr","","Get an extended attribute",19,null],[11,"listxattr","","List extended attribute names",19,null],[11,"removexattr","","Remove an extended attribute",19,null],[11,"access","","Check file access permissions\nThis will be called for the access() system call. If the &#39;default_permissions&#39;\nmount option is given, this method is not called. This method is not called\nunder Linux kernel versions 2.4.x",19,null],[11,"create","","Create and open a file\nIf the file does not exist, first create it with the specified mode, and then\nopen it. Open flags (with the exception of O_NOCTTY) are available in flags.\nFilesystem may store an arbitrary file handle (pointer, index, etc) in fh,\nand use this in other all other file operations (read, write, flush, release,\nfsync). There are also some flags (direct_io, keep_cache) which the\nfilesystem may set, to change the way the file is opened. See fuse_file_info\nstructure in &lt;fuse_common.h&gt; for more details. If this method is not\nimplemented or under Linux kernel versions earlier than 2.6.15, the mknod()\nand open() methods will be called instead.",19,null],[11,"getlk","","Test for a POSIX file lock",19,null],[11,"setlk","","Acquire, modify or release a POSIX file lock\nFor POSIX threads (NPTL) there&#39;s a 1-1 relation between pid and owner, but\notherwise this is not always the case.  For checking lock ownership,\n&#39;fi-&gt;owner&#39; must be used. The l_pid field in &#39;struct flock&#39; should only be\nused to fill in this field in getlk(). Note: if the locking methods are not\nimplemented, the kernel will still allow file locking to work locally.\nHence these are only interesting for network filesystems and similar.",19,null],[11,"bmap","","Map block index within file to block index within device\nNote: This makes sense only for block device backed filesystems mounted\nwith the &#39;blkdev&#39; option",19,null],[11,"setvolname","","OS X only: Rename the volume. Set fuse_init_out.flags during init to\nFUSE_VOL_RENAME to enable",19,null],[11,"exchange","","OS X only (undocumented)",19,null],[11,"getxtimes","","OS X only: Query extended times (bkuptime and crtime). Set fuse_init_out.flags\nduring init to FUSE_XTIMES to enable",19,null],[11,"eq","","",3,null],[11,"hash","","",3,null],[11,"fmt","","",3,null],[11,"clone","","",3,null],[11,"fmt","","",2,null],[11,"clone","","",2,null]],"paths":[[3,"Session"],[3,"BackgroundSession"],[3,"FileAttr"],[4,"FileType"],[3,"Box"],[3,"ReplyEmpty"],[3,"ReplyData"],[3,"ReplyEntry"],[3,"ReplyAttr"],[3,"ReplyXTimes"],[3,"ReplyOpen"],[3,"ReplyWrite"],[3,"ReplyStatfs"],[3,"ReplyCreate"],[3,"ReplyLock"],[3,"ReplyBmap"],[3,"ReplyDirectory"],[3,"Request"],[8,"Reply"],[8,"Filesystem"]]};
initSearch(searchIndex);
