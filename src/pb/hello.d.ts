import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace hello. */
export namespace hello {

    /** Properties of a HelloReq. */
    interface IHelloReq {

        /** HelloReq Name */
        Name?: (string|null);
    }

    /** Represents a HelloReq. */
    class HelloReq implements IHelloReq {

        /**
         * Constructs a new HelloReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: hello.IHelloReq);

        /** HelloReq Name. */
        public Name: string;

        /**
         * Creates a new HelloReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HelloReq instance
         */
        public static create(properties?: hello.IHelloReq): hello.HelloReq;

        /**
         * Encodes the specified HelloReq message. Does not implicitly {@link hello.HelloReq.verify|verify} messages.
         * @param message HelloReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hello.IHelloReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HelloReq message, length delimited. Does not implicitly {@link hello.HelloReq.verify|verify} messages.
         * @param message HelloReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hello.IHelloReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HelloReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HelloReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hello.HelloReq;

        /**
         * Decodes a HelloReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HelloReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hello.HelloReq;

        /**
         * Verifies a HelloReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HelloReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HelloReq
         */
        public static fromObject(object: { [k: string]: any }): hello.HelloReq;

        /**
         * Creates a plain object from a HelloReq message. Also converts values to other types if specified.
         * @param message HelloReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hello.HelloReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HelloReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for HelloReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a HelloResp. */
    interface IHelloResp {

        /** HelloResp Msg */
        Msg?: (string|null);
    }

    /** Represents a HelloResp. */
    class HelloResp implements IHelloResp {

        /**
         * Constructs a new HelloResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: hello.IHelloResp);

        /** HelloResp Msg. */
        public Msg: string;

        /**
         * Creates a new HelloResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HelloResp instance
         */
        public static create(properties?: hello.IHelloResp): hello.HelloResp;

        /**
         * Encodes the specified HelloResp message. Does not implicitly {@link hello.HelloResp.verify|verify} messages.
         * @param message HelloResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hello.IHelloResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HelloResp message, length delimited. Does not implicitly {@link hello.HelloResp.verify|verify} messages.
         * @param message HelloResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hello.IHelloResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HelloResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HelloResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hello.HelloResp;

        /**
         * Decodes a HelloResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HelloResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hello.HelloResp;

        /**
         * Verifies a HelloResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HelloResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HelloResp
         */
        public static fromObject(object: { [k: string]: any }): hello.HelloResp;

        /**
         * Creates a plain object from a HelloResp message. Also converts values to other types if specified.
         * @param message HelloResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hello.HelloResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HelloResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for HelloResp
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
