/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.hello = (function() {

    /**
     * Namespace hello.
     * @exports hello
     * @namespace
     */
    var hello = {};

    hello.HelloReq = (function() {

        /**
         * Properties of a HelloReq.
         * @memberof hello
         * @interface IHelloReq
         * @property {string|null} [Name] HelloReq Name
         */

        /**
         * Constructs a new HelloReq.
         * @memberof hello
         * @classdesc Represents a HelloReq.
         * @implements IHelloReq
         * @constructor
         * @param {hello.IHelloReq=} [properties] Properties to set
         */
        function HelloReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HelloReq Name.
         * @member {string} Name
         * @memberof hello.HelloReq
         * @instance
         */
        HelloReq.prototype.Name = "";

        /**
         * Creates a new HelloReq instance using the specified properties.
         * @function create
         * @memberof hello.HelloReq
         * @static
         * @param {hello.IHelloReq=} [properties] Properties to set
         * @returns {hello.HelloReq} HelloReq instance
         */
        HelloReq.create = function create(properties) {
            return new HelloReq(properties);
        };

        /**
         * Encodes the specified HelloReq message. Does not implicitly {@link hello.HelloReq.verify|verify} messages.
         * @function encode
         * @memberof hello.HelloReq
         * @static
         * @param {hello.IHelloReq} message HelloReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HelloReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Name != null && Object.hasOwnProperty.call(message, "Name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Name);
            return writer;
        };

        /**
         * Encodes the specified HelloReq message, length delimited. Does not implicitly {@link hello.HelloReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hello.HelloReq
         * @static
         * @param {hello.IHelloReq} message HelloReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HelloReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HelloReq message from the specified reader or buffer.
         * @function decode
         * @memberof hello.HelloReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hello.HelloReq} HelloReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HelloReq.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hello.HelloReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.Name = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HelloReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hello.HelloReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hello.HelloReq} HelloReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HelloReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HelloReq message.
         * @function verify
         * @memberof hello.HelloReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HelloReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Name != null && message.hasOwnProperty("Name"))
                if (!$util.isString(message.Name))
                    return "Name: string expected";
            return null;
        };

        /**
         * Creates a HelloReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hello.HelloReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hello.HelloReq} HelloReq
         */
        HelloReq.fromObject = function fromObject(object) {
            if (object instanceof $root.hello.HelloReq)
                return object;
            var message = new $root.hello.HelloReq();
            if (object.Name != null)
                message.Name = String(object.Name);
            return message;
        };

        /**
         * Creates a plain object from a HelloReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hello.HelloReq
         * @static
         * @param {hello.HelloReq} message HelloReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HelloReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.Name = "";
            if (message.Name != null && message.hasOwnProperty("Name"))
                object.Name = message.Name;
            return object;
        };

        /**
         * Converts this HelloReq to JSON.
         * @function toJSON
         * @memberof hello.HelloReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HelloReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for HelloReq
         * @function getTypeUrl
         * @memberof hello.HelloReq
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        HelloReq.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hello.HelloReq";
        };

        return HelloReq;
    })();

    hello.HelloResp = (function() {

        /**
         * Properties of a HelloResp.
         * @memberof hello
         * @interface IHelloResp
         * @property {string|null} [Msg] HelloResp Msg
         */

        /**
         * Constructs a new HelloResp.
         * @memberof hello
         * @classdesc Represents a HelloResp.
         * @implements IHelloResp
         * @constructor
         * @param {hello.IHelloResp=} [properties] Properties to set
         */
        function HelloResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HelloResp Msg.
         * @member {string} Msg
         * @memberof hello.HelloResp
         * @instance
         */
        HelloResp.prototype.Msg = "";

        /**
         * Creates a new HelloResp instance using the specified properties.
         * @function create
         * @memberof hello.HelloResp
         * @static
         * @param {hello.IHelloResp=} [properties] Properties to set
         * @returns {hello.HelloResp} HelloResp instance
         */
        HelloResp.create = function create(properties) {
            return new HelloResp(properties);
        };

        /**
         * Encodes the specified HelloResp message. Does not implicitly {@link hello.HelloResp.verify|verify} messages.
         * @function encode
         * @memberof hello.HelloResp
         * @static
         * @param {hello.IHelloResp} message HelloResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HelloResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Msg != null && Object.hasOwnProperty.call(message, "Msg"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Msg);
            return writer;
        };

        /**
         * Encodes the specified HelloResp message, length delimited. Does not implicitly {@link hello.HelloResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hello.HelloResp
         * @static
         * @param {hello.IHelloResp} message HelloResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HelloResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HelloResp message from the specified reader or buffer.
         * @function decode
         * @memberof hello.HelloResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hello.HelloResp} HelloResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HelloResp.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hello.HelloResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.Msg = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HelloResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hello.HelloResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hello.HelloResp} HelloResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HelloResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HelloResp message.
         * @function verify
         * @memberof hello.HelloResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HelloResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Msg != null && message.hasOwnProperty("Msg"))
                if (!$util.isString(message.Msg))
                    return "Msg: string expected";
            return null;
        };

        /**
         * Creates a HelloResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hello.HelloResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hello.HelloResp} HelloResp
         */
        HelloResp.fromObject = function fromObject(object) {
            if (object instanceof $root.hello.HelloResp)
                return object;
            var message = new $root.hello.HelloResp();
            if (object.Msg != null)
                message.Msg = String(object.Msg);
            return message;
        };

        /**
         * Creates a plain object from a HelloResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hello.HelloResp
         * @static
         * @param {hello.HelloResp} message HelloResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HelloResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.Msg = "";
            if (message.Msg != null && message.hasOwnProperty("Msg"))
                object.Msg = message.Msg;
            return object;
        };

        /**
         * Converts this HelloResp to JSON.
         * @function toJSON
         * @memberof hello.HelloResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HelloResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for HelloResp
         * @function getTypeUrl
         * @memberof hello.HelloResp
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        HelloResp.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hello.HelloResp";
        };

        return HelloResp;
    })();

    return hello;
})();

module.exports = $root;
