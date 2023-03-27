"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const article_entity_1 = require("../article/article.entity");
const category_entity_1 = require("../category/category.entity");
const review_entity_1 = require("../review/review.entity");
const settings_entity_1 = require("../settings/settings.entity");
const user_entity_1 = require("../user/user.entity");
const constants_1 = require("../../constants");
const database_config_1 = require("./database.config");
exports.databaseProviders = [
    {
        provide: constants_1.SEQUELIZE,
        useFactory: async () => {
            let config;
            switch (process.env.NODE_ENV) {
                case constants_1.DEVELOPMENT:
                    config = database_config_1.databaseConfig.development;
                    break;
                case constants_1.TEST:
                    config = database_config_1.databaseConfig.test;
                    break;
                case constants_1.PRODUCTION:
                    config = database_config_1.databaseConfig.production;
                    break;
                default:
                    config = database_config_1.databaseConfig.development;
            }
            const sequelize = new sequelize_typescript_1.Sequelize(config);
            sequelize.addModels([
                user_entity_1.UserEntity,
                article_entity_1.ArticleEntity,
                review_entity_1.ReviewEntity,
                settings_entity_1.SettingsEntity,
                category_entity_1.CategoryEntity,
            ]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
//# sourceMappingURL=database.providers.js.map