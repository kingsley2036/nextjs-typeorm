import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,OneToMany, UpdateDateColumn} from "typeorm";
import {Post} from "./Post";
import {Comment} from "./Comment";
import {getDatabaseConnection} from "../../lib/getDatabaseConnection";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('varchar')
    username: string;
    @Column('varchar')
    passwordDigest: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @OneToMany(type=>Post,post=>post.author)
    posts:Post[];
    @OneToMany(type=>Comment,comment=>comment.user)
    comments:Comment[];
    errors={
        username:[] as string[],
        password:[] as string[],
        passwordConfirmation: [] as string[]
    };
    password:string;
    passwordConfirmation:string
    //这里主要是为了使用await所以才声明异步函数
    async validate(){
        if (this.username.trim() === '') {
            this.errors.username.push('不能为空');
        }
        if (!/[a-zA-Z0-9]/.test(this.username.trim())) {
            this.errors.username.push('格式不合法');
        }
        if (this.username.trim().length > 42) {
            this.errors.username.push('太长');
        }
        if (this.username.trim().length <= 3) {
            this.errors.username.push('太短');
        }
        //这里查找数据库是一个异步过程,需要使用await
        const found  =await (await getDatabaseConnection()).manager.find(User,{username:this.username})
        if(found.length>0){
            this.errors.username.push('已存在，不能重复注册');
        }
        if (this.password === '') {
            this.errors.password.push('不能为空');
        }
        if (this.password !== this.passwordConfirmation) {
            this.errors.passwordConfirmation.push('密码不匹配');
        }
    }
    hasErrors() {
        return !!Object.values(this.errors).find(v => v.length > 0);
    }

}
