import conf from "../conf/conf"
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class Service {
    client = new Client()
    database
    bucket

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId,
                slug, 
                {
                    title, 
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
             console.log("Appwrite serive :: createPost :: error", error)
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.database.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId,
                slug,
                {
                 title,
                 content,
                 featuredImage,
                 status,    
                }
            )
        } catch (error) {
             console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
             console.log("Appwrite serive :: deletePost :: error", error)
             return false
        }
    }

    async getPost(slug){
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error)
            return false
        }
    }

    async getPosts(){
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("status", "active")
                ]
            )
        } catch (error) {
            console.log("Appwrite error :: getPosts :: error", error)
            return false
        }
    }

    //upload file

    async createFile(file){
        try {
            return this.bucket.createFile(
                conf.appwriteDatabaseId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error)
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    async getFilePreview(fileId){
        return await this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}



const service = new Service()
export default service

