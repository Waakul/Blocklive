export default class UserManager {
    users = {}

    verify(username,token) {
        return !!(getUser(username)?.token == token)
    }

    befriend(base,to) {
        console.log(base + ' friending ' + to)
        this.getUser(base)?.friends.push(to)
    }
    unbefriend(base,take) {
        console.log(base + ' unfriending ' + to)
        this.getUser(base)?.friends.splice(this.getUser(base)?.friends.indexOf(take),1)
    }

    getUser(username) {
        if(!(username.toLowerCase() in this.users)) {
            this.addUser(username)
        }
        return this.users[username.toLowerCase()]
    }

    addUser(username) {
        if(!(username?.toLowerCase() in this.users)) {
            this.users[username.toLowerCase()] = {friends:[],token:this.token(),sharedTo:{},myProjects:[]}
        }
        return this.getUser(username)
    }

    newProject(owner,blId) {
        console.log(`usrMngr: adding new project ${blId} owned by ${owner}`)
        if(this.getUser(owner).myProjects.indexOf(blId) != -1){return}
        this.getUser(owner).myProjects.push(blId)
    }

    share(username,blId,from) {
        console.log(`usrMngr: sharing ${blId} with ${username} from ${from}`)
        let map = this.getUser(username)?.sharedTo
        if(!map) {return}
        if(blId in map) {return}
        map[blId] = {from,id:blId}
    }
    unShare(username,blId) {
        console.log(`usrMngr: unsharing ${blId} with ${username}`)
        let map = this.getUser(username)?.sharedTo
        if(!map) {return}
        delete map[blId]
    }
    getSharedObjects(username) {
        return Object.values(this.getUser(username)?.sharedTo)
    }
    getShared(username) {
        let user = this.getUser(username)
        let objs = this.getSharedObjects(username)
        if(!objs) {return []}
        return objs.filter((proj)=>(user.friends.indexOf(proj.from)!=-1)).map((proj)=>(proj.id))
    }
    getAllProjects(username) {
        return this.getUser().myProjects.concat(this.getShared(username))
    }

    rand() {
        return Math.random().toString(36).substr(2); // remove `0.`
    };
    
    token() {
        return this.rand() + this.rand(); // to make it longer
    };
}