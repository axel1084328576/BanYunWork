/**
 *测试
 * */
// const host="http://192.168.96.53:8089/maildatav";
// const host="http://192.168.97.195:8089/maildatav";
// const host="http://192.168.96.91:8901";
// const host = "http://111.160.20.248:8090/maildatav1";
// const host="11.160.20.248:8090/maildatav1";
// const host="http://10.10.75.147:9001/maildatav";
/**
 *正式
 * */
// const host="http://111.160.20.248:8090/maildatav";
const host = "http://111.160.20.248:8089/maildatav";
/**
 *临时
 * */
// const host="http://192.168.96.53:8089/maildatav";
// const host="http://192.168.97.134:8089/maildatav";
// const host="http://localhost:8089/maildatav";
// const host="http://localhost:8089";

/**
 *打包
 * */
// const host="/maildatav";

// 用户登入
const loginDir = "/dologin";
// const loginDir="/bwdev/dologin";

const reloadDir = "/reload";
const logoutDir = "/logout";

//动态菜单
const userMenu = "/usermenu";

// 面单查询
const mailDir = "/ch/anyidi/list";
// const company="/mail/company/list";
// const company="/system/org/companylist";
const company = "/system/org/usercompanylist";

// 用户管理
const modifyPasswordDir = "/system/user/chgpwd";
const resetPasswordDir = "/system/user/resetpwd";
const getUserListDir = "/system/user/list";
const delUserDir = "/system/user/deluser";
const saveOrAddUserDir = "/system/user/saveuser";
const authorityRoleDir = "/system/user/saveuserrole";
const userRoles = "/system/user/userroles";

// 角色信息管理
const addOrSaveRoleDir = "/system/role/saverole";
const delRoleDir = "/system/role/delrole";
const authorityUserDir = "/system/role/saveroleuser";
const authorityMenuDir = "/system/role/saverolemenu";
const getRoleList = "/system/role/list";
const getRoleMenu = "/system/role/rolemenus";

// 组织管理
const delDir = "/system/org/delorg";
const allTreeDir = "/system/org/alltree";
const partTreeDir = "/system/org/tree";
const saveOrAddDir = "/system/org/saveorg";
const orglistDir = "/system/org/list";

//菜单接口
const menuAddOrEdit = "/system/menu/savemenu";
const menuDel = "/system/menu/delmenu";
const menuTree = "/system/menu/tree";
const menuAllTree = "/system/menu/alltree";
const menuList = "/system/menu/list";


// 车辆信息管理
const carListDir = "/mail/car/list";
const addOrSaveCarDir = "/mail/car/savecar";
const delCarDir = "/mail/car/delcar";
const carInfoDir = "/mail/car/info";
const carUpload = "/mail/car/importcar";
const carMapDate = "/ch/gps/curcarpos";
const carDate = "/mail/car/getDwxx";
const mapDate = "/ch/gps/cargps";


//安检机登记
const replayCheckList = "/mail/inspectmachine/list";
const replayCheckDel = "/mail/inspectmachine/delmachine";
const replayCheckAddOrEdit = "/mail/inspectmachine/savemachine";
const replayCheckSelect = "/mail/inspectmachine/info";
const replayUpload = "/mail/inspectmachine/importmachine";

//从业人员登记
const infoAddOrEdit = "/mail/employee/saveemployee";
const infoDel = "/mail/employee/delemployee";
const infoSelect = "/mail/employee/info";
const infoList = "/mail/employee/list";
const infoUpload = "/mail/employee/importemployee";
const jobTypeList = "/mail/employee/level";

//视频资源登记
const videoAddOrEdit = "/mail/video/savevideo";
const videoDel = "/mail/video/delvideo";
const videoSelect = "/mail/video/info";
const videoList = "/mail/video/list";

//快递网点接口
const expressAddOrEdit = "/mail/workstation/saveexpress";
const expressDel = "/mail/workstation/delexpress";
const expressSelect = "/mail/workstation/info";
const expressList = "/mail/workstation/expresslist";
const expressUpload = "/mail/workstation/importexpress";

//邮政网点接口管理
const postAddOrEdit = "/mail/workstation/savepost";
const postDel = "/mail/workstation/delpost";
const postSelect = "/mail/workstation/info";
const postList = "/mail/workstation/postlist";
const postUpload = "/mail/workstation/importpost";

//信筒信箱管理接口
const mailAddOrEdit = "/mail/mailbox/savemailbox";
const mailDel = "/mail/mailbox/delmailbox";
const mailSelect = "/mail/mailbox/list";
const mailList = "/mail/mailbox/list";
const mailUpload = "/mail/mailbox/importmailbox";

//快递箱
const boxAddOrEdit = "/mail/expressbox/saveexpressbox";
const boxDel = "/mail/expressbox/delexpressbox";
const boxSelect = "/mail/expressbox/info";
// const boxList = "/mail/expressbox/list";
const boxList = "/mail/expressbox/listPostexpresscabinet";
const boxUpload = "/mail/expressbox/importexpressbox";


//字典管理
const dictList = "/system/dict/list";
const dictInfo = "/system/dict/info";
const dictTypeDicttree = "/system/dict/tree";
const dictDel = "/system/dict/deldict";
const dictSave = "/system/dict/savedict";

//参数管理
const parasetList = "/system/paraset/list";
const parasetInfo = "/system/paraset/info";
const parasetDel = "/system/paraset/delparaset";
const parasetSave = "/system/paraset/saveparaset";

//企业管理
const compnayList = "/system/org/usercompanylist";
const companyInfo = "/mail/company/info";
const companyDel = "/mail/company/delcompany";
const companySave = "/mail/company/savecompany";
const companySelect = "/system/dict/companyType/dicteasyuioption/0";

//数据资产
const anyidi = "/ch/anyidi/count";

//统计
const anyidiTotal = "/ch/anyidi/total";

//公司api
const newComponeyList = "/system/org/usercompanyeasyuioption/0";

//各界面控制权限
const userpagebuttonpriv = "/userpagebuttonpriv";

//企业管理-安全协议
const gsOption = "/securityinfo/operation";
const gsImport = "/securityinfo/importsecurity";
const gsList = "/securityinfo/list";

const xyOption = "/aqxy/operation";
const xyImport = "/aqxy/importsecurity";
const xyList = "/aqxy/list";

//企业管理-危化品名录
const cheOption = "/whpml/operation";
const cheImport = "/whpml/importmd";
const cheList = "/whpml/list";

//企业管理-危化品企业
const wqyOption = "/whpqy/operation";
const wqyImport = "/whpqy/importmd";
const wqyList = "/whpqy/list";

//寄递品牌管理-寄递企业
const jdqList = "/jdqynl/list";
const jdqOption = "/jdqynl/operation";
const jdqImport = "/jdqynl/importmd";

//寄递品牌管理-网点管理
const sortNet = "/mail/workstation/networktype";

//快件箱管理-投递信息
const send = "/mail/expressbox/listPostExpressBox";
//快件箱管理-取件信息
const pickup = "/mail/expressbox/listPostsendinfo";

//星级评定
const starList = "/star/list";
const starOption = "/star/operation";
const starImport = "/star/importmd";

//执法检查备案
const enforceList = "/enforce/list";
const enforceOption = "/enforce/operation";
const enforceImport = "/enforce/importmd";

//电商面单管理
const dsList = "/ds/list";
const dsOption = "/ds/operation";
const dsImport = "/ds/importmd";

//公益服务-报刊亭
const gyfwList = "/gyfw/list";
const gyfwOption = "/gyfw/operation";
const gyfwImport = "/gyfw/importmd";

//公益服务-安全协议图片
const picDown = "/aqxy/download";
const picUpDown = "/aqxy/updown";
const picDel = "/aqxy/delete";


export default {
  host,

  loginDir,
  reloadDir,
  logoutDir,
  modifyPasswordDir,
  resetPasswordDir,
  getUserListDir,
  delUserDir,
  saveOrAddUserDir,
  authorityRoleDir,

  delDir,
  allTreeDir,
  partTreeDir,
  saveOrAddDir,
  orglistDir,

  addOrSaveRoleDir,
  delRoleDir,
  authorityUserDir,
  authorityMenuDir,
  getRoleList,
  getRoleMenu,
  userRoles,


  carListDir,
  addOrSaveCarDir,
  delCarDir,
  carInfoDir,
  carUpload,
  carMapDate,
  carDate,
  mapDate,

  replayCheckList,
  replayCheckDel,
  replayCheckAddOrEdit,
  replayCheckSelect,
  replayUpload,

  infoAddOrEdit,
  infoDel,
  infoSelect,
  infoList,
  infoUpload,
  jobTypeList,

  videoAddOrEdit,
  videoDel,
  videoSelect,
  videoList,

  expressAddOrEdit,
  expressDel,
  expressSelect,
  expressList,
  expressUpload,

  postAddOrEdit,
  postDel,
  postSelect,
  postList,
  postUpload,

  mailAddOrEdit,
  mailDel,
  mailSelect,
  mailList,
  mailUpload,

  mailDir,
  company,

  menuAddOrEdit,
  menuDel,
  menuTree,
  menuAllTree,
  menuList,

  userMenu,

  anyidi,

  anyidiTotal,

  dictList,
  dictInfo,
  dictTypeDicttree,
  dictDel,
  dictSave,

  parasetList,
  parasetInfo,
  parasetDel,
  parasetSave,

  compnayList,
  companyInfo,
  companyDel,
  companySave,
  companySelect,

  boxAddOrEdit,
  boxDel,
  boxSelect,
  boxList,
  boxUpload,

  newComponeyList,

  userpagebuttonpriv,

  cheOption,
  cheImport,
  cheList,

  wqyOption,
  wqyImport,
  wqyList,

  jdqList,
  jdqOption,
  jdqImport,

  sortNet,

  send,
  pickup,

  starList,
  starOption,
  starImport,

  enforceList,
  enforceOption,
  enforceImport,

  dsList,
  dsOption,
  dsImport,

  gyfwList,
  gyfwOption,
  gyfwImport,

  gsOption,
  gsImport,
  gsList,

  xyOption,
  xyImport,
  xyList,

  picUpDown,
  picDown,
  picDel,
};