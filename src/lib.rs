/*!
 * FUSE userspace library implementation (as of libosxfuse-2.5.5).
 *
 * This is an improved rewrite of the FUSE userspace library (lowlevel
 * interface) to fully take advantage of Rust's architecture. The only thing
 * we rely on in the real libfuse are mount and unmount calls which are
 * needed to establish a fd to talk to the kernel driver.
 */

#[link(name = "fuse",
       vers = "0.1",
       uuid = "9385b964-5831-426e-b8b1-97acffc564d9",
       url = "https://github.com/zargony/rust-fuse.git")];
#[crate_type = "lib"];

#[comment = "Rust FUSE - Filesystem in Userspace"];
#[author = "Andreas Neuhaus <info@zargony.com>"];
#[license = "MIT"];

#[feature(globs)];

// --------------------------------------------------------------------------

use std::libc::{c_int, mode_t, dev_t, size_t, off_t};
use std::libc::ENOSYS;
use session::{Session, BackgroundSession};

// Re-export types used in results of filesystem operations
pub use native::{fuse_attr, fuse_kstatfs, fuse_file_lock, fuse_entry_out, fuse_attr_out};
pub use native::{fuse_setattr_in, fuse_open_out, fuse_write_out};
pub use native::{fuse_statfs_out, fuse_getxattr_out, fuse_lk_out, fuse_bmap_out};
pub use native::consts;
#[cfg(target_os = "macos")]
pub use native::{fuse_getxtimes_out};

pub use sendable::DirBuffer;

/// Filesystem trait.
///
/// This trait must be implemented to provide a userspace filesystem via FUSE.
/// These methods corrospond to fuse_lowlevel_ops in libfuse. Reasonable default
/// implementations are provided here to get a mountable filesystem that does
/// nothing.
pub trait Filesystem {
	/// Initialize filesystem
	/// Called before any other filesystem method.
	fn init (&mut self) -> Result<(), c_int>																					{ Ok(()) }

	/// Clean up filesystem
	/// Called on filesystem exit.
	fn destroy (&mut self)																										{ }

	/// Look up a directory entry by name and get its attributes.
	fn lookup (&mut self, _parent: u64, _name: &[u8]) -> Result<~fuse_entry_out, c_int>											{ Err(ENOSYS) }

	/// Forget about an inode
	/// The nlookup parameter indicates the number of lookups previously performed on
	/// this inode. If the filesystem implements inode lifetimes, it is recommended that
	/// inodes acquire a single reference on each lookup, and lose nlookup references on
	/// each forget. The filesystem may ignore forget calls, if the inodes don't need to
	/// have a limited lifetime. On unmount it is not guaranteed, that all referenced
	/// inodes will receive a forget message.
	fn forget (&mut self, _ino: u64, _nlookup: uint)																			{ }

	/// Get file attributes
	fn getattr (&mut self, _ino: u64) -> Result<~fuse_attr_out, c_int>															{ Err(ENOSYS) }

	/// Set file attributes
	/// In the 'attr' argument only members indicated by the 'valid' bitmask contain
	/// valid values. Other members contain undefined values.
	fn setattr (&mut self, _ino: u64, _attr: &fuse_setattr_in) -> Result<~fuse_attr_out, c_int>									{ Err(ENOSYS) }

	/// Read symbolic link
	fn readlink (&mut self, _ino: u64) -> Result<~[u8], c_int>																	{ Err(ENOSYS) }

	/// Create file node
	/// Create a regular file, character device, block device, fifo or socket node.
	fn mknod (&mut self, _parent: u64, _name: &[u8], _mode: mode_t, _rdev: dev_t) -> Result<~fuse_entry_out, c_int>				{ Err(ENOSYS) }

	/// Create a directory
	fn mkdir (&mut self, _parent: u64, _name: &[u8], _mode: mode_t) -> Result<~fuse_entry_out, c_int>							{ Err(ENOSYS) }

	/// Remove a file
	fn unlink (&mut self, _parent: u64, _name: &[u8]) -> Result<(), c_int>														{ Err(ENOSYS) }

	/// Remove a directory
	fn rmdir (&mut self, _parent: u64, _name: &[u8]) -> Result<(), c_int>														{ Err(ENOSYS) }

	/// Create a symbolic link
	fn symlink (&mut self, _parent: u64, _name: &[u8], _link: &[u8]) -> Result<~fuse_entry_out, c_int>							{ Err(ENOSYS) }

	/// Rename a file
	fn rename (&mut self, _parent: u64, _name: &[u8], _newparent: u64, _newname: &[u8]) -> Result<(), c_int>						{ Err(ENOSYS) }

	/// Create a hard link
	fn link (&mut self, _ino: u64, _newparent: u64, _newname: &[u8]) -> Result<~fuse_entry_out, c_int>							{ Err(ENOSYS) }

	/// Open a file
	/// Open flags (with the exception of O_CREAT, O_EXCL, O_NOCTTY and O_TRUNC) are
	/// available in flags. Filesystem may store an arbitrary file handle (pointer, index,
	/// etc) in fh, and use this in other all other file operations (read, write, flush,
	/// release, fsync). Filesystem may also implement stateless file I/O and not store
	/// anything in fh. There are also some flags (direct_io, keep_cache) which the
	/// filesystem may set, to change the way the file is opened. See fuse_file_info
	/// structure in <fuse_common.h> for more details.
	fn open (&mut self, _ino: u64, _flags: uint) -> Result<~fuse_open_out, c_int>												{ Ok(~fuse_open_out { fh: 0, open_flags: 0, padding: 0 }) }

	/// Read data
	/// Read should send exactly the number of bytes requested except on EOF or error,
	/// otherwise the rest of the data will be substituted with zeroes. An exception to
	/// this is when the file has been opened in 'direct_io' mode, in which case the
	/// return value of the read system call will reflect the return value of this
	/// operation. fh will contain the value set by the open method, or will be undefined
	/// if the open method didn't set any value.
	fn read (&mut self, _ino: u64, _fh: u64, _offset: off_t, _size: size_t) -> Result<~[u8], c_int>								{ Err(ENOSYS) }

	/// Write data
	/// Write should return exactly the number of bytes requested except on error. An
	/// exception to this is when the file has been opened in 'direct_io' mode, in
	/// which case the return value of the write system call will reflect the return
	/// value of this operation. fh will contain the value set by the open method, or
	/// will be undefined if the open method didn't set any value.
	fn write (&mut self, _ino: u64, _fh: u64, _offset: off_t, _data: &[u8], _flags: uint) -> Result<size_t, c_int>				{ Err(ENOSYS) }

	/// Flush method
	/// This is called on each close() of the opened file. Since file descriptors can
	/// be duplicated (dup, dup2, fork), for one open call there may be many flush
	/// calls. Filesystems shouldn't assume that flush will always be called after some
	/// writes, or that if will be called at all. fh will contain the value set by the
	/// open method, or will be undefined if the open method didn't set any value.
	/// NOTE: the name of the method is misleading, since (unlike fsync) the filesystem
	/// is not forced to flush pending writes. One reason to flush data, is if the
	/// filesystem wants to return write errors. If the filesystem supports file locking
	/// operations (setlk, getlk) it should remove all locks belonging to 'lock_owner'.
	fn flush (&mut self, _ino: u64, _fh: u64, _lock_owner: u64) -> Result<(), c_int>											{ Err(ENOSYS) }

	/// Release an open file
	/// Release is called when there are no more references to an open file: all file
	/// descriptors are closed and all memory mappings are unmapped. For every open
	/// call there will be exactly one release call. The filesystem may reply with an
	/// error, but error values are not returned to close() or munmap() which triggered
	/// the release. fh will contain the value set by the open method, or will be undefined
	/// if the open method didn't set any value. flags will contain the same flags as for
	/// open.
	fn release (&mut self, _ino: u64, _fh: u64, _flags: uint, _lock_owner: u64, _flush: bool) -> Result<(), c_int>				{ Ok(()) }

	/// Synchronize file contents
	/// If the datasync parameter is non-zero, then only the user data should be flushed,
	/// not the meta data.
	fn fsync (&mut self, _ino: u64, _fh: u64, _datasync: bool) -> Result<(), c_int>												{ Err(ENOSYS) }

	/// Open a directory
	/// Filesystem may store an arbitrary file handle (pointer, index, etc) in fh, and
	/// use this in other all other directory stream operations (readdir, releasedir,
	/// fsyncdir). Filesystem may also implement stateless directory I/O and not store
	/// anything in fh, though that makes it impossible to implement standard conforming
	/// directory stream operations in case the contents of the directory can change
	/// between opendir and releasedir.
	fn opendir (&mut self, _ino: u64, _flags: uint) -> Result<~fuse_open_out, c_int>											{ Ok(~fuse_open_out { fh: 0, open_flags: 0, padding: 0 }) }

	/// Read directory
	/// Send a buffer filled using buffer.fill(), with size not exceeding the
	/// requested size. Send an empty buffer on end of stream. fh will contain the
	/// value set by the opendir method, or will be undefined if the opendir method
	/// didn't set any value.
	fn readdir (&mut self, _ino: u64, _fh: u64, _offset: off_t, _buffer: ~DirBuffer) -> Result<~DirBuffer, c_int>				{ Err(ENOSYS) }

	/// Release an open directory
	/// For every opendir call there will be exactly one releasedir call. fh will
	/// contain the value set by the opendir method, or will be undefined if the
	/// opendir method didn't set any value.
	fn releasedir (&mut self, _ino: u64, _fh: u64, _flags: uint) -> Result<(), c_int>											{ Ok(()) }

	/// Synchronize directory contents
	/// If the datasync parameter is set, then only the directory contents should
	/// be flushed, not the meta data. fh will contain the value set by the opendir
	/// method, or will be undefined if the opendir method didn't set any value.
	fn fsyncdir (&mut self, _ino: u64, _fh: u64, _datasync: bool) -> Result<(), c_int>											{ Err(ENOSYS) }

	/// Get file system statistics
	fn statfs (&mut self, _ino: u64) -> Result<~fuse_statfs_out, c_int>															{ Ok(~fuse_statfs_out { st: fuse_kstatfs { blocks: 0, bfree: 0, bavail: 0, files: 0, ffree: 0, bsize: 512, namelen: 255, frsize: 0, padding: 0, spare: [0, ..6] }}) }

	/// Set an extended attribute
	fn setxattr (&mut self, _ino: u64, _name: &[u8], _value: &[u8], _flags: uint, _position: off_t) -> Result<(), c_int>			{ Err(ENOSYS) }

	/// Get an extended attribute
	fn getxattr (&mut self, _ino: u64, _name: &[u8]) -> Result<~[u8], c_int>														{ Err(ENOSYS) }

	/// List extended attribute names
	fn listxattr (&mut self, _ino: u64) -> Result<~[&[u8]], c_int>																{ Err(ENOSYS) }

	/// Remove an extended attribute
	fn removexattr (&mut self, _ino: u64, _name: &[u8]) -> Result<(), c_int>														{ Err(ENOSYS) }

	/// Check file access permissions
	/// This will be called for the access() system call. If the 'default_permissions'
	/// mount option is given, this method is not called. This method is not called
	/// under Linux kernel versions 2.4.x
	fn access (&mut self, _ino: u64, _mask: uint) -> Result<(), c_int>															{ Err(ENOSYS) }

	/// Create and open a file
	/// If the file does not exist, first create it with the specified mode, and then
	/// open it. Open flags (with the exception of O_NOCTTY) are available in flags.
	/// Filesystem may store an arbitrary file handle (pointer, index, etc) in fh,
	/// and use this in other all other file operations (read, write, flush, release,
	/// fsync). There are also some flags (direct_io, keep_cache) which the
	/// filesystem may set, to change the way the file is opened. See fuse_file_info
	/// structure in <fuse_common.h> for more details. If this method is not
	/// implemented or under Linux kernel versions earlier than 2.6.15, the mknod()
	/// and open() methods will be called instead.
	fn create (&mut self, _parent: u64, _name: &[u8], _mode: mode_t, _flags: uint) -> Result<(~fuse_entry_out,~fuse_open_out), c_int>	{ Err(ENOSYS) }

	/// Test for a POSIX file lock
	fn getlk (&mut self, _ino: u64, _fh: u64, _lock_owner: u64, _lock: &fuse_file_lock) -> Result<~fuse_file_lock, c_int>				{ Err(ENOSYS) }

	/// Acquire, modify or release a POSIX file lock
	/// For POSIX threads (NPTL) there's a 1-1 relation between pid and owner, but
	/// otherwise this is not always the case.  For checking lock ownership,
	/// 'fi->owner' must be used. The l_pid field in 'struct flock' should only be
	/// used to fill in this field in getlk(). Note: if the locking methods are not
	/// implemented, the kernel will still allow file locking to work locally.
	/// Hence these are only interesting for network filesystems and similar.
	fn setlk (&mut self, _ino: u64, _fh: u64, _lock_owner: u64, _lock: &fuse_file_lock, _sleep: bool) -> Result<(), c_int>		{ Err(ENOSYS) }

	/// Map block index within file to block index within device
	/// Note: This makes sense only for block device backed filesystems mounted
	/// with the 'blkdev' option
	fn bmap (&mut self, _ino: u64, _blocksize: size_t, _idx: u64) -> Result<~fuse_bmap_out, c_int>								{ Err(ENOSYS) }

	/// OS X only: Rename the volume. Set fuse_init_out.flags during init to
	/// FUSE_VOL_RENAME to enable
	#[cfg(target_os = "macos")]
	fn setvolname (&mut self, _name: &[u8]) -> Result<(), c_int>																	{ Err(ENOSYS) }

	/// OS X only (undocumented)
	#[cfg(target_os = "macos")]
	fn exchange (&mut self, _parent: u64, _name: &[u8], _newparent: u64, _newname: &[u8], _options: uint) -> Result<(), c_int>	{ Err(ENOSYS) }

	/// OS X only: Query extended times (bkuptime and crtime). Set fuse_init_out.flags
	/// during init to FUSE_XTIMES to enable
	#[cfg(target_os = "macos")]
	fn getxtimes (&mut self, _ino: u64) -> Result<~fuse_getxtimes_out, c_int>													{ Err(ENOSYS) }
}

/// Mount the given filesystem to the given mountpoint
pub fn mount<FS: Filesystem+Send> (filesystem: FS, mountpoint: &Path, options: &[&[u8]]) -> BackgroundSession {
	Session::mount(filesystem, mountpoint, options).start()
}

// --------------------------------------------------------------------------

mod argument;
mod channel;
mod native;
mod request;
mod sendable;
mod session;

/// Function to turn [u8] vectors into strings without failing.  The only reason to use this is when
/// logging, hence the name.  There is an [issue open with
/// rust](https://github.com/mozilla/rust/issues/8968) to allow for better ways of converting
/// non-utf8 character streams to string.  Once that's fixed, this should be able to go away.
fn logstr(s:&[u8]) -> ~str {
	use std::str::not_utf8::cond;
	let _t = cond.trap(|error| error);
	std::str::from_utf8(s)
}

