import { refreshTokensTable } from "./refresh-tokens.schema.js";
import { usersTable } from "./users.schema.js";
import { relations } from "drizzle-orm";


export const userRelations = relations(usersTable, ({ one }) => ({
    refreshTokens: one(refreshTokensTable, {
        fields: [usersTable.id],
        references: [refreshTokensTable.userId],
    }),
}));