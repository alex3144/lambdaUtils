"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const cleanOptions_1 = require("../mongo/cleanOptions");
const mongo_1 = require("../mongo/mongo");
const cleanFilterAndScopeToClient_1 = require("../mongo/cleanFilterAndScopeToClient");
const createScopedDocument_1 = require("../mongo/createScopedDocument");
const scopeReturnedDocument_1 = require("../mongo/scopeReturnedDocument");
const httpResponse_1 = require("../apiGateway/httpResponse");
exports.generateResourceLambdas = (description) => {
    // Create
    const CreateResourceFunction = ({ client_id, resource, customData = {}, }) => __awaiter(void 0, void 0, void 0, function* () {
        const DB = yield mongo_1.db();
        const collection = DB.collection(description.resourceName);
        let document;
        if (description.shared) {
            const findFields = lodash_1.pick(resource, description.findFields || description.uniqueFields);
            document = yield collection.findOne(findFields);
            if (document && document.scopedData[client_id] !== undefined) {
                return httpResponse_1.ErrorAlreadyExist({ data: scopeReturnedDocument_1.scopeReturnedDocument({ document, client_id, description }) });
            }
            if (document) {
                yield collection.findOneAndUpdate(findFields, { $set: { [`scopedData.${client_id}`]: customData } });
                return httpResponse_1.Success({ data: Object.assign(Object.assign({}, lodash_1.omit(document, '_id', 'scopedData')), { customData }) });
            }
            yield collection.insertOne(createScopedDocument_1.createScopedInsert({
                client_id, customData, resource,
            }));
            return httpResponse_1.Success({ statusCode: 201, data: Object.assign(Object.assign({}, resource), { customData }) });
        }
        // not shared
        const findFields = lodash_1.pick(resource, description.findFields || description.uniqueFields);
        document = yield collection.findOne(findFields, {
            projection: { _id: 0 },
        });
        if (document) {
            return httpResponse_1.ErrorAlreadyExist({ data: document });
        }
        yield collection.insertOne(Object.assign(Object.assign({}, resource), { customData }));
        return httpResponse_1.Success({ statusCode: 201, data: Object.assign(Object.assign({}, resource), { customData }) });
    });
    // Read
    const ReadResourceFunction = ({ client_id, filter = {}, }) => __awaiter(void 0, void 0, void 0, function* () {
        const DB = yield mongo_1.db();
        const collection = DB.collection(description.resourceName);
        const finalFilter = cleanFilterAndScopeToClient_1.cleanFilterAndScopeToClient({ client_id, filter, description });
        const cursor = yield collection.find(finalFilter, {
            projection: { _id: 0 },
        });
        // scope customData or not
        const result = yield cursor.toArray();
        const finalResult = scopeReturnedDocument_1.scopeReturnedDocuments({
            documents: result,
            client_id,
            description,
        });
        return httpResponse_1.Success({ data: finalResult });
    });
    // Delete
    const DeleteResourceFunction = ({ client_id, filter = {}, }) => __awaiter(void 0, void 0, void 0, function* () {
        const DB = yield mongo_1.db();
        const collection = DB.collection(description.resourceName);
        const finalFilter = cleanFilterAndScopeToClient_1.cleanFilterAndScopeToClient({ client_id, filter, description });
        if (description.shared) {
            yield collection.updateMany(finalFilter, {
                $unset: { [`scopedData.${client_id}`]: '' },
            });
        }
        else {
            yield collection.deleteMany(finalFilter);
        }
        return httpResponse_1.Success({ statusCode: 204 });
    });
    // Customize
    const CustomizeResourceFunction = ({ client_id, filter = {}, options = {}, customData, }) => __awaiter(void 0, void 0, void 0, function* () {
        const DB = yield mongo_1.db();
        const collection = DB.collection(description.resourceName);
        const opts = cleanOptions_1.cleanOptions(options);
        const finalFilter = cleanFilterAndScopeToClient_1.cleanFilterAndScopeToClient({ client_id, filter, description });
        const update = lodash_1.mapValues(// for every $set, $push
        customData, (v) => lodash_1.mapKeys(// for every key firstname, lastname
        v, (v2, key) => (description.shared ? `scopedData.eoku4gqt98s3p6l7tvtnavro6.${key}` : `customData.${key}`)));
        console.log(update);
        try {
            const result = yield collection.updateMany(finalFilter, update, opts);
            return httpResponse_1.Success({ data: result.modifiedCount });
        }
        catch (e) {
            console.log(e);
        }
    });
    // Update, probably admins only
    const UpdateAdminResourceFunction = ({ resource = {}, filter = {}, options = {}, }) => __awaiter(void 0, void 0, void 0, function* () {
        const DB = yield mongo_1.db();
        const opts = cleanOptions_1.cleanOptions(options);
        const collection = DB.collection(description.resourceName);
        yield collection.updateMany(filter, resource, opts);
        return httpResponse_1.Success({ statusCode: 204 });
    });
    // Update, probably admins only
    const ReadAdminResourceFunction = ({ filter = {}, } = {}) => __awaiter(void 0, void 0, void 0, function* () {
        const DB = yield mongo_1.db();
        const collection = DB.collection(description.resourceName);
        const cursor = yield collection.find(filter, {
            projection: { _id: 0 },
        });
        const results = yield cursor.toArray();
        return httpResponse_1.Success({ data: results });
    });
    // DeleteAdmin
    const DeleteAdminResourceFunction = ({ filter = {}, } = {}) => __awaiter(void 0, void 0, void 0, function* () {
        const DB = yield mongo_1.db();
        const collection = DB.collection(description.resourceName);
        yield collection.deleteMany(filter);
        return httpResponse_1.Success({ statusCode: 204 });
    });
    return {
        Create: CreateResourceFunction,
        Read: ReadResourceFunction,
        Delete: DeleteResourceFunction,
        Customize: CustomizeResourceFunction,
        // admin methods
        UpdateAdmin: UpdateAdminResourceFunction,
        ReadAdmin: ReadAdminResourceFunction,
        DeleteAdmin: DeleteAdminResourceFunction,
    };
};
//# sourceMappingURL=generateCrudResource.js.map