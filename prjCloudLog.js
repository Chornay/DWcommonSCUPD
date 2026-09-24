import { firebase } from '@react-native-firebase/functions';
import { prjToast } from 'DWcmn/PrjToast'
import { strX } from 'DWcmn/I18n'

//prjCloudLog____ calls cloud function logToFirebase to log message
//  level is info,warning,error
//
// the Async version awaits completion, the other does not


// const _sendLog = (message, level) =>
//     firebase.app().functions('asia-southeast2').httpsCallable('logToFirebase')({ message, level });

// export const prjCloudLogAsync = async (message, level = 'info') => {
//     try { await _sendLog(message, level); } catch (e) { /* swallow, logging must not break the app */ }
// };

// export const prjCloudLog = (message, level = 'info') => {
//     _sendLog(message, level).catch(() => {});
// };

const UNEXPECTED_TOAST_TEXT = 'Unexpected error occurred'
const logFn = firebase.app().functions('asia-southeast2').httpsCallable('logToFirebase')

function toMessageAndDetail(payload) {
    if (payload instanceof Error) {
        return {
            message: payload.message,
            detail: { name: payload.name, code: payload.code, stack: payload.stack },
        }
    }
    if (typeof payload === 'string') {
        return { message: payload, detail: undefined }
    }
    const { message, ...rest } = payload || {}
    return { message: message || '(no message)', detail: Object.keys(rest).length ? rest : undefined }
}

//resolves the toast text to display, or null if none should be shown
//opts.toast and opts.toastI18n are mutually exclusive (never both set)
//precedence: toast===false -> none; toast string -> literal; toastI18n -> strX(toastI18n); else default
function resolveToastText(toast, toastI18n) {
    if (toast === false) {
        return null
    }
    if (typeof toast === 'string') {
        return toast
    }
    if (toastI18n) {
        return strX(toastI18n)
    }
    return UNEXPECTED_TOAST_TEXT
}

//TODO we can't find module in the details .. prepend to message
function writeLog(module, level, message, detail) {
    logFn({ message:module+' - '+message, level, detail: { module, ...detail } }).catch(err => {
        console.error('prjCloudLog failed to write:', err)
    })
}

//TODO we can't find module in the details .. prepend to message
async function writeLogAsync(module, level, message, detail) {
    return logFn({ message:module+' - '+message, level, detail: { module, ...detail } })
}

/**
 * @param {string} module
 * @param {string|Error|object} payload
 * @param {object} [opts]
 * @param {string|false} [opts.toast]
 * @param {string} [opts.toastI18n] i18n code for the toast text; mutually exclusive with opts.toast
 * @param {boolean} [opts.wait]
 * @param {string} [opts.level='error']
 */
export async function prjCloudLogError(module, payload, { toast, toastI18n, wait = false, level = 'error' } = {}) {
    if (!module) throw new Error('prjCloudLogError: module is required')

    const toastText = resolveToastText(toast, toastI18n)
    if (toastText !== null) {
        prjToast({ type: 'danger', text: toastText })
    }

    const { message, detail } = toMessageAndDetail(payload)
    if (wait) {
        await writeLogAsync(module, level, message, detail)
    } else {
        writeLog(module, level, message, detail)
    }
}

/**
 * @param {string} module
 * @param {string|object} payload
 * @param {object} [opts]
 * @param {boolean} [opts.wait]
 * @param {string} [opts.level='info']
 */
export async function prjCloudLogInfo(module, payload, { wait = false, level = 'info' } = {}) {
    if (!module) throw new Error('prjCloudLogInfo: module is required')

    const { message, detail } = toMessageAndDetail(payload)
    if (wait) {
        await writeLogAsync(module, level, message, detail)
    } else {
        writeLog(module, level, message, detail)
    }
}