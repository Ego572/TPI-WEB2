import sequelize from "../db/config.js";
import user from "../models/user.js";

const users = [
    {
        userName: "maria_garcia",
        email: "maria.garcia@gmail.com",
        password: "Maria1234",
        
    },
    {
        userName: "lucas_perez",
        email: "lucas.perez@gmail.com",
        password: "Lucas1234",
        
    },
    {
        userName: "sofia_romero",
        email: "sofia.romero@gmail.com",
        password: "Sofia1234",
        
    },
    {
        userName: "nicolas_lopez",
        email: "nicolas.lopez@gmail.com",
        password: "Nicolas1234",
        
    }
];

async function seed() {
    try {
        await sequelize.authenticate();
        console.log("✅ Conexión a la base de datos exitosa.");

        // Sincroniza sin borrar datos existentes
        await sequelize.sync();

        for (const userData of users) {
            const [instance, created] = await user.findOrCreate({
                where: { userName: userData.userName },
                defaults: userData
            });

            if (created) {
                console.log(`✅ Usuario creado: ${instance.userName}`);
            } else {
                console.log(`⚠️  Usuario ya existe: ${instance.userName} (omitido)`);
            }
        }

        console.log("\n🌱 Seeding completado.");
    } catch (error) {
        console.error("❌ Error al ejecutar el seeder:", error);
    } finally {
        await sequelize.close();
    }
}

seed();