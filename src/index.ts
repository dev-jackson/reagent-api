import "reflect-metadata";
import { startServer } from "./server";
import { connect } from "./config/typeorm";
async function main(){
    connect()
    const app = await startServer();
    app.listen(app.get('port'));
    console.log('Server on port ', app.get('port'));
}

main();