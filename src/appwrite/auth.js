import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}) {
        try {
            const user = await this.account.create(ID.unique(), email, password, name)
            if(user) {
                return this.login({email, password})
            }else{
                return user
            }
        } catch (error) {
            console.log("appwrite Error :: createAccount :: ",error)
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("appwrite Error :: Login :: ",error)
        }
    }

    async getCurrUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("appwrite Error :: noUser :: ",error)
        }

        return null
    }

     async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error)
        }
    }
    
}

const authService = new AuthService();

export default authService