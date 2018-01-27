const DEFAULT_MESSAGE = '网络错误，请重试';
const errorCode = {};
const codeInfoMap = [];

/**
 * 定义一个错误码
 * @param {number} code 错误码，必须唯一
 * @param {null | string?} message 错误描述，会下发给浏览器端让用户看见。若不填则使用默认值。
 *                                   通过特殊标志${1}或${2}等，配合MError的setMessageTemplateData方法可以嵌入变量
 * @param {boolean?} fatal 是否是致命错误，默认为true。致命错误在测试环境会显示大红条提示
 * @return {number}
 */
function defineCode(code, message, fatal) {
    if (codeInfoMap[code]) {
        throw new Error(`重复的错误码:${code}`);
    }
    codeInfoMap[code] = {
        message: message || `(${code})${DEFAULT_MESSAGE}`,
        fatal: fatal === undefined || fatal
    };
    return code;
}

/**
 * 获取错误码对应的错误信息
 * @param {number} code
 * @returns {{message: string, fatal: boolean}}
 */
errorCode.getCodeData = function getCodeData(code) {
    if (codeInfoMap[code]) {
        return codeInfoMap[code];
    }
    console.error(`未知的错误码:${code}`);
    return {
        message: DEFAULT_MESSAGE,
        fatal: true
    };
};

/* eslint-disable no-template-curly-in-string */
/** 无错误 */
errorCode.SUCCESS = defineCode(0, '');

/** 不知名错误 */
errorCode.UNKNOWN = defineCode(1, '未知错误');

/** **********************************以下前端相关的错误码*********************************** */

/** 401未授权 */
errorCode.HTTP_UNAUTHORIZED = defineCode(1001, '请求未授权');

/** 前端请求超时 */
errorCode.HTTP_TIME_OUT = defineCode(1002, '网络超时，请重试');

/** 403禁止访问 */
errorCode.HTTP_FORBIDDEN = defineCode(1003, '禁止访问');

/** 404找不到 */
errorCode.HTTP_NOT_FOUND = defineCode(1004, '请求的网址不存在');

/** 其它前端请求网络错误 */
errorCode.HTTP_NETWORK_ERR = defineCode(1005, '网络连接错误，请重试');

/** 微信支付错误 */
errorCode.WECHAT_PAY_ERROR = defineCode(1006, '微信支付遇到问题，请重新支付');

/** 还没回包，又发送了相同的请求 */
errorCode.DUPLICATE_REQUEST = defineCode(1007, '操作过于频繁，请稍候再试', false);

/** **********************************以下发包相关的错误码*********************************** */

/** 域名被墙 */
errorCode.HOST_UNRESOLVED = defineCode(2001);

/** 还未连接上 */
errorCode.NOT_CONNECTED = defineCode(2002);

/** 服务器断开连接 */
errorCode.SERVER_CLOSED = defineCode(2003);

/** 发包超时 */
errorCode.TIME_OUT = defineCode(2004, '网络超时，请重试');

/** 已达到最大重发次数 */
errorCode.MAX_RETRY = defineCode(2005);

/** 解析包错误 */
errorCode.PARSE_ERROR = defineCode(2006);

/** 无法创建请求包 */
errorCode.PACKET_ERROR = defineCode(2008);

/** 指定的地址在远程机器上不可用 */
errorCode.ADDRESS_NOT_AVAILABLE = defineCode(2009);

/** socket连接尝试超时 */
errorCode.CONNCTION_TIMEDOUT = defineCode(2010);

/** 服务器主动拒绝建立连接 */
errorCode.CONNCTION_REFUSED = defineCode(2011);

/** 连接已被重置 */
errorCode.CONNCTION_RESET = defineCode(2012);

/** 从本机到给定addr的网络不通 */
errorCode.NETWORK_UNREACHABLE = defineCode(2013);

/** socket 已经连接 */
errorCode.IS_CONNECTED = defineCode(2014);

/** 端口号被占用 */
errorCode.ADDRESS_IN_USE = defineCode(2015);

/** socket 发送数据返回错误 */
errorCode.SOCKET_SEND_ERROR = defineCode(2016);

/** 参数错误 */
errorCode.PARAMETER_ERROR = defineCode(2017, '参数错误');

/** 服务器操作数据时返回错误 */
errorCode.SERVER_PROCESSCE_ERROR = defineCode(2018);

/** 服务器返回数据为空 */
errorCode.SERVER_RETURN_EMPTY_DATA = defineCode(2019);

/** 不允许把数据库中查出的数据直接下发到浏览器 */
errorCode.CANNOT_SEND_NATIVE_DATA = defineCode(2020);

/** 请求包过大 */
errorCode.REQUEST_TOO_LARGE = defineCode(2021, '数据量过大，发送失败');

/** 禁止访问该端口 */
errorCode.FORBIDDEN_PORT = defineCode(2022, '禁止访问该端口');

/** 被拦截的攻击请求 */
errorCode.HACK_DETECTED = defineCode(2023);

/** 已经回过包了，不能多次回包 */
errorCode.HAS_RESPONSED = defineCode(2024);

/** 服务器端向第三方服务器请求数据时错误 */
errorCode.THIRD_SEVER_ERROR = defineCode(2025);

/** 微信服务器返回的错误 */
errorCode.WX_SERVER_ERROR = defineCode(2026, '微信访问错误');

/** 微信服务器返回的系统繁忙错误 */
errorCode.WX_SERVER_BUSY = defineCode(2027, '微信服务器繁忙');

/** 微信服务器返回的accessToken错误 */
errorCode.WX_ACCESS_TOKEN_INVALID = defineCode(2028, '微信AccessToken错误');

/** 微信服务器返回的accessToken过期 */
errorCode.WX_ACCESS_TOKEN_EXPIRED = defineCode(2029, '微信AccessToken已过期');

/** 微信服务器返回的openId错误 */
errorCode.WX_OPENID_INVALID = defineCode(2030, '微信openId错误');

/** 向微信获取openId时返回的错误 */
errorCode.WX_GET_OPENID_ERROR = defineCode(2031, '获取微信openId错误');

/** 向微信获取jsapiTicket时返回的错误 */
errorCode.WX_GET_JS_API_TICKET_ERROR = defineCode(2032, '获取微信jsapiTicket错误');


/** **********************************以下是微服务间请求用的错误码*********************************** */

/** 未知的微服务地址 */
errorCode.UNKNOWN_INNER_SERVER_NAME = defineCode(4001, '无法连接到服务器');

/** 向微服务发请求失败，连接建立不成功 */
errorCode.INNER_SERVER_REQUEST_FAIL = defineCode(4002, '服务器连接失败');

/** 向微服务发请求，收到了非200的状态码 */
errorCode.INNER_SERVER_REQUEST_ERROR = defineCode(4003, '服务器连接错误');

/** **********************************以下是各业务用的错误码*********************************** */
/** 未登录，请求中没有找到自己的sessionKey */
errorCode.NOT_SIGNIN = defineCode(3001, '未登录，请登录后再试', false);

/** 登录态已过期，需要重新登录 */
errorCode.NEED_RELOGIN = defineCode(3002, '登录态已过期，请重新登录后再试', false);

/** 登录回包中没有返回id */
errorCode.LOGIN_NO_OPENID = defineCode(3003, '登录失败，请重试');

/** 登录回包中没有返回sessionKey */
errorCode.LOGIN_NO_SESSION_KEY = defineCode(3004, '登录失败，请重试');

/** 注册时发现手机号已注册 */
errorCode.SIGNUP_PHONE_EXIST = defineCode(3005, '该手机号已注册', false);

/** 服务器端返回的账号或密码错误 */
errorCode.SIGNIN_FAIL = defineCode(3006, '账号或密码错误', false);

/** 账号或密码格式错误 */
errorCode.SIGNIN_ACCOUNT_INVALID = defineCode(3007, '账号或密码填写错误', false);

/** 密码格式错误，不能使用此错误码，防止账号被试出 */
// errorCode.SIGNIN_PASSWORD_INVALID = defineCode(3008, '密码填写错误', false);

/** 验证码没填 */
errorCode.SIGNUP_VERIFY_CODE_INVALID = defineCode(3009, '验证码填写错误');

/** 验证码错误 */
errorCode.REGISTER_VERIFY_CODE_WRONG = defineCode(3011, '验证码错误', false);

/** 七牛上传时返回错误 */
errorCode.QINIU_UPLOAD_ERROR = defineCode(3013);

/** 加载七牛上的资源时网络错误 */
errorCode.QINIU_DOWNLOAD_ERROR = defineCode(3014);

/** 向指定号码发送短信过多，达到运营商限制了 */
errorCode.SEND_TOO_MANY_SMS = defineCode(3016, '发送短信次数过多');

/** 短信发送频率过快 */
errorCode.SEND_SMS_TOO_FAST = defineCode(3017, '短信发送频率过快，请${1}秒后再试', false);

/** 数据库访问错误 */
errorCode.ACESS_DATABASE_ERROR = defineCode(3018, '数据库访问错误');

/** 下载文件错误 */
errorCode.DOWNLOAD_FILE_ERROR = defineCode(3024, '下载错误');

/** 数据库还未建立连接 */
errorCode.DATABASE_CONNECTION_NOT_EXIST = defineCode(3026);

/** 创建id时出错 */
errorCode.CREATE_OPENID_ERROR = defineCode(3027);

/** 用户已存在 */
errorCode.USER_HAS_EXISTED = defineCode(3031, '用户已存在');

/** 用户不存在 */
errorCode.USER_NOT_EXIST = defineCode(3032, '用户不存在');

/** 从数据库中查到了出乎意料的数据 */
errorCode.UNEXPECTED_DB_DATA = defineCode(3034);

/** 查询数据库返回空 */
errorCode.FIND_NOTHING_IN_DB = defineCode(3037, '该${1}不存在');

/** 数据不存在或已删除，无法修改 */
errorCode.CANNOT_MODIFY_DELETED_DATA = defineCode(3038, '${1}已删除，无法修改');

/** 没有微信openid */
errorCode.NO_WX_OPENID = defineCode(3043, '请在微信中打开该网页');

/** 手机号格式错误 */
errorCode.INVALID_PHONE = defineCode(3044, '手机号格式错误');

/** 数据库中的数据要调用gFilterDocument后再下发到浏览器 */
errorCode.CANNOT_SEND_NATIVE_DATA = defineCode(3046, null, false);

/** 数据库任务队列超时，可能某个任务忘记了回调 */
errorCode.DB_TASK_QUEUE_TIME_OUT = defineCode(3047);

/** 获取token错误 */
errorCode.GET_ACCESS_TOKEN = defineCode(3049, '获取token错误', false);

/** 不具备当前操作权限 */
errorCode.NO_AUTHORITY = defineCode(3050, '不具备当前操作权限');

/** 机构未包含校区信息 */
errorCode.NO_CAMPUS_INFO = defineCode(3051, '机构未包含校区信息');

/** 不具有当前校区的操作权限 */
errorCode.NOT_OWN_CAMPUS = defineCode(3052, '不具有当前校区的操作权限');

/** 排课时间冲突 */
errorCode.CONFLICT_SCHEDULING = defineCode(3053, '排课时间冲突');

/** 超过截止时间，不允许上传考勤信息 */
errorCode.EXCEED_DEAD_LINE = defineCode(3054, '超过截止时间');

/** 考勤记录不存在 */
errorCode.ATTENDANCE_NOT_EXIST = defineCode(3055, '考勤记录不存在');

/** 记录不存在 */
errorCode.RECORD_NOT_EXIST = defineCode(3056, '记录不存在');

/** 该课程下已有班级，请先删除班级以后再修改 */
errorCode.COURSE_ALREADY_SCHEDLED = defineCode(3057, '该课程下已有班级，请先删除班级以后再修改');

/** 导入的excel数据为空 */
errorCode.IMPORT_EXCEL_DATA_NOT_EXIST = defineCode(3058, '导入的excel数据为空');

/** 文件保存失败 */
errorCode.FILE_SAVE_FAILE = defineCode(3059, '文件保存失败');

/** 表头设置不准确 */
errorCode.TABLE_HEAD_SETUP_NO_CORRET = defineCode(3060, '表头设置不准确');

/** 排课时间早于班级开课时间或当前时间 */
errorCode.SCHEDULING_TIME_WRONG = defineCode(3061, '排课时间早于班级开课时间或当前时间');

/** 排课总课时数大于课程指定课时数 */
errorCode.SCHEDULING_PERIOD_WRONG = defineCode(3062, '排课总课时数大于课程指定课时数');

/** 分配的权限不存在系统权限组内 */
errorCode.AUTHORITY_GROUP_NOT_IN_SYSYTEM = defineCode(3063, '分配的权限不存在系统权限组内');

/** 账号未启用 */
errorCode.ACCOUNT_NOT_ENABLE = defineCode(3064, '账号未启用');

/** 定义数据库时使用了保留字，比如type */
errorCode.CANNOT_USE_RESERVED_WORD_IN_DB = defineCode(3065);

/** 请求微信支付订单参数错误 */
errorCode.REQUEST_WX_ORDER_PARAM_ERROR = defineCode(3066, '请求微信支付订单参数错误');

/** 请求微信支付订单网络错误 */
errorCode.REQUEST_WX_ORDER_FAILED = defineCode(3067, '请求微信支付订单网络错误');

/** 校验微信支付订单参数错误 */
errorCode.CHECK_WX_ORDER_PARAM_ERROR = defineCode(3068, '校验微信支付订单参数错误');

/** 微信第三方平台验证票据不存在 */
errorCode.VERIFY_TICKET_NOT_EXIST = defineCode(3069, '微信第三方平台验证票据不存在');

/** 微信第三方平台接口调用凭据不存在 */
errorCode.COMPONET_ACCESS_TOKEN_NOT_EXIST = defineCode(3070, '微信第三方平台接口调用凭据不存在');

/** 没有微信用户信息 */
errorCode.NO_WX_USER_INFO = defineCode(3071, '请在微信中打开该网页');

/** 支付申请正在审核中，不能重复发起 */
errorCode.PURCHASE_BE_CHECKING = defineCode(3072, '支付申请正在审核中，不能重复发起');

/** 不能重复转正 */
errorCode.CAN_NOT_BECOME_FORMAL_TWICE = defineCode(3073, '不能重复转正');

/** 未转正不能购买课程 */
errorCode.CAN_NOT_PURCHASE_BEFOR_FORMAL = defineCode(3074, '未转正不能购买课程');

/** 当前状态错误不能获取下一状态 */
errorCode.CURRENT_STATUS_WRONG = defineCode(3075, '当前状态错误不能获取下一状态');

/** 未到考勤时间，不允许上传考勤信息 */
errorCode.BEFORE_THE_START_TIME = defineCode(3076, '未到考勤时间');

/** 同一校区下学员手机号与姓名重复 */
errorCode.STUDENT_INFO_REPEAT = defineCode(3077, '此意向学员已录入过，不能重复录入');

/** 处理待办事项的管理员不存在 */
errorCode.TODO_MANAGER_NOT_EXIST = defineCode(3078, '处理待办事项的管理员不存在');

/** 当前报名的课程正在审核中，不能重复提交申请 */
errorCode.PURCHASE_COURSE_IS_UNDER_REVIEW = defineCode(3079, '当前报名的课程正在审核中，不能重复提交申请');

/** 通知事项相关的管理员不存在 */
errorCode.NOTIFY_MANAGER_NOT_EXIST = defineCode(3080, '通知事项相关的管理员不存在');

/** 定时任务结构不正确 */
errorCode.TIMING_TASK_STRUCT_WRONG = defineCode(3081, '定时任务结构不正确');

/** 支付请求不能重复处理 */
errorCode.PURCHASE_REQUEST_HANDLE_REPEAT = defineCode(3082, '此确认请求已经被处理，请忽略', false);

/** 不能存在匹配的学员信息 */
errorCode.NO_MATCHED_STUDENT_INFO = defineCode(3083, '学员姓名、手机号与系统不一致');

/** 存在多个相同手机号学员，需要选择绑定账号所在的校区 */
errorCode.NEED_TO_CHOICE_CAMPUS = defineCode(3084, '需要选择待绑定账号所在的校区');

/** 指定校区下没有匹配的学员信息 */
errorCode.NO_MATCHED_STUDENT_UNDER_CAMPUS = defineCode(3085, '指定校区下没有匹配的学员信息');

/** 管理员信息不存在 */
errorCode.NO_MANAGER_INFO = defineCode(3086, '管理员信息不存在');

/** 不能切换到非自己所属的校区 */
errorCode.CAN_NOT_SWITCH_CAMPUS = defineCode(3087, '不能切换到非自己所属的校区');

/** 同一校区下课程名重复 */
errorCode.COURSE_REPEAT = defineCode(3088, '本校区已有一个同名的课程，请调整一下课名', false);

/** 同一校区下班级名重复 */
errorCode.EDU_CLASS_REPEAT = defineCode(3089, '同一校区下班级名重复', false);

/** 不能修改为已存在的学员名字（相同手机号） */
errorCode.STUDENT_NAME_REPEAT = defineCode(3090, '不能修改为已存在的学员名字（相同手机号）');

/** 循环定时任务结构不正确 */
errorCode.LOOP_TASK_STRUCT_WRONG = defineCode(3091, '循环定时任务结构不正确');

/** 原登录密码不正确 */
errorCode.ORIGINAL_PASSWORD_NOT_RIGHT = defineCode(3092, '原登录密码不正确');

/** 不能为过去的时间排课 */
errorCode.CAN_NOT_SCHEDULING_TO_PAST = defineCode(3093, '不能为过去的时间排课');

/** 没有匹配的接受消息的管理员 */
errorCode.NO_MATCHED_RECEIVER_MANAGER = defineCode(3094, '没有匹配的接受消息的管理员');

/** 本校区暂无咨询主管，无法提出报名确认 */
errorCode.NO_MATCHED_COUNSELOR_MANAGER = defineCode(3095, '本校区暂无咨询主管，所以无法报名，请校长先创建咨询主管角色');

/** 没有匹配的课程信息 */
errorCode.NO_MATCHED_COURSE_INFO = defineCode(3096, '没有匹配的课程信息');

/** 购买课时数不能大于当前班级剩余课时数 */
errorCode.REMAIN_PERIODS_NOT_ENOUGH = defineCode(3097, '购买课时数不能大于当前班级剩余课时数');

/** 已经设置过本月目标金额 */
errorCode.HAS_SET_TARGET_AMOUNT = defineCode(3098, '已经设置过本月目标金额');

/** 无法删除当前班级 */
errorCode.CAN_NOT_DELETE_EDUCLASS = defineCode(3099, '班级里还有学员，请先给学员退课后，再删除班级');

/** 没有匹配的请假请求 */
errorCode.NO_MATCHED_LEAVE_REQUEST = defineCode(3100, '没有匹配的请假请求');

/** 请假请求已经被处理过 */
errorCode.LEAVE_REQUEST_HAS_BEEN_PROCESSED = defineCode(3101, '请假请求已经被处理过，请忽略', false);

/** 无法保存员工信息，未选择负责的校区 */
errorCode.STAFF_NO_CAMPUS_ID = defineCode(3102, '无法保存员工信息，未选择负责的校区');

/** 没有匹配的报名记录，无法退课 */
errorCode.CAN_NOT_REFUND_NOT_JOINED_CLASS = defineCode(3103, '没有匹配的报名记录，无法退课');

/** 存在未确认的报名请求，不能退课 */
errorCode.CAN_NOT_REFUND_BEFORE_CONFIRM_PURCAHSE = defineCode(3104, '存在未确认的报名请求，不能退课。请先联系咨询主管进行确认', false);

/** 退课金额不能大于当前剩余金额 */
errorCode.REMAIN_AMOUNT_IS_NOT_ENOUGH = defineCode(3105, '退课金额不能大于当前剩余金额');

/** 当前报名班级正在审核中，不能重复提交申请 */
errorCode.REFUND_REQUEST_IS_UNDER_REVIEW = defineCode(3106, '当前退课请求正在审核中，不能重复提交申请', false);

/** 退课请求不能重复处理 */
errorCode.REFUND_REQUEST_HAS_BEEN_HANDLED = defineCode(3107, '此确认请求已经被处理，请忽略', false);

/** 存在未确认的退课请求，不能报名 */
errorCode.CAN_NOT_PURCAHSE_BEFORE_CONFIRM_REFUND = defineCode(3108, '存在未确认的退课请求，不能报名。请先联系教务主管进行确认', false);

/** 学员总的剩余课时小于减去的课时 */
errorCode.REMAIN_PERIODS_LET_DES_PERIODS = defineCode(3109, '学员总的剩余课时小于减去的课时');

/** 没有匹配的上课信息 */
errorCode.NO_MATCHED_SCHEDULING_INFO = defineCode(3110, '没有匹配的上课信息');

/** 没有匹配的请假信息 */
errorCode.NO_MATCHED_LEAVE_INFO = defineCode(3111, '没有匹配的请假信息');

/** 转班请求不能重复处理 */
errorCode.CHANGE_REQUEST_HAS_BEEN_HANDLED = defineCode(3112, '此确认请求已经被处理，请忽略', false);

/** 只能在同类型课程下转班 */
errorCode.CAN_NOT_CHANGE_EDUCLASS_ON_DIFF_COURSE = defineCode(3113, '只能在同类型课程下转班', false);

/** 转入班级不能是原班级 */
errorCode.CAN_NOT_CHANGE_EDUCLASS_ON_SAME_CLASS = defineCode(3114, '转入班级不能是原班级', false);

/** 转班请求正在审核中，不能重复发起 */
errorCode.CAN_NOT_CHANGE_BEFORE_CONFIRM = defineCode(3115, '转班请求正在审核中，不能重复发起', false);

/** 不能重复设置预约试听状态 */
errorCode.CAN_NOT_SET_AUDITION_STATE_REPEAT = defineCode(3116, '不能重复设置预约试听状态', false);

/** 名字中不能包含特殊字符 */
errorCode.CAN_NOT_CONTAIN_SPECIFIED_CHAR = defineCode(3117, '名字中不能包含特殊字符', false);

/** 名字长度不能超过15个字符 */
errorCode.CAN_NOT_EXCEED_LIMITED_CHARS = defineCode(3118, '名字长度不能超过15个字符', false);

/** 不能重复设置预约到访状态 */
errorCode.CAN_NOT_SET_APPOINTED_STATE_REPEAT = defineCode(3119, '不能重复设置预约到访状态', false);

/** 存在未完成的预约试听或预约到访 */
errorCode.CAN_NOT_SET_TRACK_BEFORE_DONE = defineCode(3120, '存在未完成的预约试听或预约到访', false);

/** 不能删除已有提交记录的作业 */
errorCode.CAN_NOT_DELETE_WORK = defineCode(3122, '不能删除已有提交记录的作业');

/** 分班课时不能大于课程剩余总课时 */
errorCode.COURSE_PERIODS_NOT_ENOUGH = defineCode(3123, '分班课时不能大于课程剩余总课时');

/** 校区名字在当前校区已存在 */
errorCode.REPEATED_CAMPUS_NAME = defineCode(3124, '校区名字在当前校区已存在');

/** 当前管理员不在指定校区内 */
errorCode.NOT_IN_SPECIFIED_CAMPUS = defineCode(3125, '当前管理员不在指定校区内');

/** 每个字段需保存至少一个选项，不可删除 */
errorCode.AT_LEAST_ONE_PARAMETER = defineCode(3126, '每个字段需保存至少一个选项，不可删除');

/** 字段参数不可重复 */
errorCode.FIELD_PARAM_CAN_NOT_REPATED = defineCode(3127, '字段参数不可重复');

/** 只能新增50个字段，如需新增，请先删除已有字段  */
errorCode.CAN_NOT_MORE_CUSTOMIZED_FIELDS = defineCode(3128, '只能新增50个字段，如需新增，请先删除已有字段');

/** 自定义字段已经被更新，需要下载最新的excel导入文件 */
errorCode.CUSTOMIZED_HAVE_BEEN_CHANGED = defineCode(3129, '自定义字段已经被更新，需要下载最新的excel导入文件');

/** 手机号已存在（相同姓名） */
errorCode.STUDENT_PHONE_REPEAT = defineCode(3130, '机构已有此学员，不能重复创建');

/** 用户授权信息不存在 */
errorCode.AUTHORIZATION_INFO_NOT_EXIST = defineCode(3131, '用户授权信息不存在');

/** 微信授权方接口调用凭据不存在 */
errorCode.AUTHORIZER_ACCESS_TOKEN_NOT_EXIST = defineCode(3132, '微信授权方接口调用凭据不存在');

/** 没有添加指定类型的模板 */
errorCode.NOT_ADD_SPECIFIED_TEMPLATE = defineCode(3133, '没有添加指定类型的模板');

/** 账号错误 */
errorCode.WRONG_ACCOUNT = defineCode(3134, '账号错误');

/** 密码错误 */
errorCode.WRONG_PASSWORD = defineCode(3135, '密码错误');

/** 学员姓名与系统不一致 */
errorCode.NO_MATCHED_STUDENT_NAME = defineCode(3136, '学员姓名与系统不一致');

/** 手机号与系统的不一致 */
errorCode.NO_MATCHED_STUDENT_PHONE = defineCode(3137, '手机号与系统的不一致');

/** 需要教师考勤以后才能提交作业 */
errorCode.CAN_NOT_SUBMIT_WORK_BEFOR_ATTENDANCE = defineCode(3138, '需要教师考勤以后才能提交作业');

/** 没有匹配的路由映射 */
errorCode.NO_MATCHED_ROUTES_RULE = defineCode(3139, '没有匹配的路由映射');

/** 生成二维码失败 */
errorCode.GENERATE_QR_FAIL = defineCode(3140, '无法生成二维码');

/** 未登录需要扫码签到的校区 */
errorCode.NEED_CHECKIN_CAMPUS_NOT_SIGNIN = defineCode(3141, '您需要先用微信绑定账号后才能进行签到哦');

/** 此二维码已过期 */
errorCode.QR_CODE_IS_OUT_OF_TIME = defineCode(3142, '此二维码已过期');

/** 总库不存在，不能返回总库 */
errorCode.CENTER_STORAGE_NOT_EXISTS = defineCode(3143, '总库不存在，不能返回总库');

/** 选择的出库类型不正确 */
errorCode.OUT_STORAGE_TYPE_WRONG = defineCode(3144, '选择的出库类型不正确');

/** 不能对分库执行入库或编辑信息操作 */
errorCode.NOT_CENTER_STORAGE = defineCode(3145, '不能对分库执行入库或编辑信息操作');

/** 库存不足，不能进行出库操作，需要增加库存后重试 */
errorCode.STORAGE_SUM_NOT_ENOUGH = defineCode(3146, '库存不足，不能进行出库操作，需要增加库存后重试');

/** 登录缺少入口信息 */
errorCode.NO_ENTRY_INFO = defineCode(3147, '登录缺少入口信息');

/** 绑定的亲友信息不存在 */
errorCode.BIND_RELATIVES_NOT_EXIST = defineCode(3148, '绑定的亲友信息不存在');

/** 只能绑定手机号相同的亲友 */
errorCode.CAN_NOT_BIND_DIFF_PHONE = defineCode(3149, '只能绑定手机号相同的亲友');

/** 无法切换到不是亲友关系的学员账号 */
errorCode.CAN_NOT_SWITCH_TO_STRANGER = defineCode(3150, '无法切换到不是亲友关系的学员账号');

/** 剩余赠送课时不足 */
errorCode.NOT_ENOUGH_FREE_PERIODS = defineCode(3151, '剩余赠送课时不足');

/** 不能删除过去的排课 */
errorCode.CAN_NOT_DEL_PAST_SCHEDULING = defineCode(3152, '不能删除过去的排课');

/** 不能删除已经考勤过的排课 */
errorCode.CAN_NOT_DEL_RECORD_SCHEDULING = defineCode(3153, '不能删除已经考勤过的排课');

/** 目标课程不包含目标班级 */
errorCode.COURSE_NOT_INCLUDE_EDUCLASS = defineCode(3154, '目标课程不包含目标班级');

/** 原班级课时不足，不能转移到目标课程 */
errorCode.ORIGINAL_EDUCLASS_PERIODS_NOT_ENOUGH = defineCode(3155, '原班级课时不足，不能转移到目标课程');

module.exports = errorCode;
