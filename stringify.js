"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stringify(obj, options) {
    const opt = Object.assign({
        indent: "  ",
        maxDepth: 4,
        showUndefined: false,
        showNull: true,
        leadingComma: false,
    }, {
        ...options,
        indent: options?.indent !== undefined ? " ".repeat(options.indent) : "  ",
    });
    const seen = new WeakSet();
    let msg = "";
    let depth = 0;
    let runner = (key, value) => {
        let keyLabel = key === "" ? "" : `${key}: `;
        let indent = `${opt.indent.repeat(depth)}`;
        let prefix = `${indent}${keyLabel}`;
        if (value === undefined) {
            if (opt.showUndefined) {
                msg += `${prefix}undefined`;
                return true;
            }
            return false;
        }
        if (value === null) {
            if (opt.showNull) {
                msg += `${prefix}null`;
                return true;
            }
            return false;
        }
        if (value instanceof Date) {
            msg += `${prefix}"[Date: ${value.toISOString()}]"`;
            return true;
        }
        if (typeof value === "number") {
            msg += `${prefix}${value}`;
            return true;
        }
        if (typeof value === "string") {
            msg += `${prefix}"${value}"`;
            return true;
        }
        if (value instanceof RegExp) {
            msg += `${prefix}"[RegExp: ${value.toString()}]"`;
            return true;
        }
        if (typeof value === "object") {
            // NOTE: value === "object" includes Array!
            if (seen.has(value)) {
                msg += `${prefix}"[circular ref]"`;
                return true;
            }
            seen.add(value);
            depth++;
            if (Array.isArray(value)) {
                msg += `${prefix}[\n`;
                for (let i = 0; i < value.length; i++) {
                    const added = runner("", value[i]);
                    if (!added)
                        continue;
                    if (opt.leadingComma || i < value.length - 1)
                        msg += ",";
                    msg += "\n";
                }
                msg += `${indent}]`;
            }
            else {
                if (opt.maxDepth && depth > opt.maxDepth) {
                    msg += `${prefix}[max depth]`;
                    depth--;
                    return true;
                }
                msg += `${prefix}{\n`;
                let entries = Object.entries(value);
                for (let i = 0; i < entries.length; i++) {
                    let [key, child] = entries[i];
                    const added = runner(key, child);
                    if (!added)
                        continue;
                    if (opt.leadingComma || i < entries.length - 1)
                        msg += ",";
                    msg += "\n";
                }
                msg += `${indent}}`;
            }
            depth--;
            return true;
        }
        msg += `${prefix}${value}`;
        return true;
    };
    runner("", obj);
    return msg;
}
exports.default = stringify;
