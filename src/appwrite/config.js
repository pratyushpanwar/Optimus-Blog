import { Client, Storage, TablesDB } from "appwrite";
import conf from "../conf/conf";

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new TablesDB(this.client)
        this.bucket = new Storage(this.client)
    }

    //Post service

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createRow({
                databaseId: conf.databaseId,
                tableId: conf.appwriteCollectionId,
                tableId: slug,
                data: {
                    title,
                    content,
                    status,
                    featuredImage,
                    userId
                }

            })
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error ",
                error)
            return false
        }
    }
    
    async updatePost(slug, {title, content, featuredImage, status, userId}) {
        try {
            return await this.databases.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: appwriteCollectionId,
                rowId:slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status
                }
            })
        } catch (error) {
            console.log("Appwrite error :: updatePost :: error ",
                error);
            return false;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug
            })
            return true
        } catch (error) {
            console.log("Appwrite error :: deletePost :: error ",
                error)
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug
            })
        } catch (error) {
            console.log("Appwrite error :: getPost :: error ",
                error);
            return false
        }
    }

    async getPosts(){
        try {
            return await this.databases.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                queries:[Query.equal('status','active')]
            })
        } catch (error) {
            console.log("Appwrite error :: getPosts :: error ",
                error);
            return false
        }
    }


    //File service

    async uploadFile(file){
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file: file
            })
        } catch (error) {
            console.log("Appwrite error :: uploadFile :: error ",
                error)
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId: fileId
            })
            return true;
        } catch (error) {
            console.log("Appwrite error :: deleteFile :: error ",
                error)
                return false
        }
    }

    async getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview({
                bucketId: conf.appwriteBucketId,
                fileId: fileId
            })
        } catch (error) {
            console.log("Appwrite error :: getFilePreview :: error ",
                error)
            return false;
        }
    }
}

const service = new Service();
export default service