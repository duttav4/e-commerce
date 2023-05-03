import bcrypt from "bcrypt";

export const hashPassword = async(password)=>{
    try {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds)
        return hashedPassword;
    } catch (error) {
        console.log(error)
    }
}

export const comparepassword = async( password, hashedPassword )=>{
    try {
        return await bcrypt.compare( password, hashedPassword);
    } catch (error) {
        console.log(error)
    }
} 