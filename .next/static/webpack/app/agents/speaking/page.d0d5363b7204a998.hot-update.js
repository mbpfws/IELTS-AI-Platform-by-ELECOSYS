"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/agents/speaking/page",{

/***/ "(app-pages-browser)/./src/services/databaseService.ts":
/*!*****************************************!*\
  !*** ./src/services/databaseService.ts ***!
  \*****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DatabaseService: () => (/* binding */ DatabaseService),\n/* harmony export */   databaseService: () => (/* binding */ databaseService)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @prisma/client */ \"(app-pages-browser)/./node_modules/@prisma/client/index-browser.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _supabaseService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./supabaseService */ \"(app-pages-browser)/./src/services/supabaseService.ts\");\n/* provided dependency */ var process = __webpack_require__(/*! process */ \"(app-pages-browser)/./node_modules/next/dist/build/polyfills/process.js\");\n\n\n// Initialize Prisma Client\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_1__.PrismaClient();\nclass DatabaseService {\n    static getInstance() {\n        if (!DatabaseService.instance) {\n            DatabaseService.instance = new DatabaseService();\n        }\n        return DatabaseService.instance;\n    }\n    // Template Management\n    async createTemplate(data) {\n        if (this.isProduction) {\n            // In production, use Supabase\n            // Convert the data structure to match Supabase\n            return await _supabaseService__WEBPACK_IMPORTED_MODULE_0__.supabaseService.createTemplate(data);\n        } else {\n            // In development, use local Prisma\n            return await prisma.speaking_Template.create({\n                data: {\n                    title: data.title,\n                    description: data.description,\n                    duration: data.duration,\n                    parts: {\n                        create: data.parts\n                    }\n                },\n                include: {\n                    parts: true\n                }\n            });\n        }\n    }\n    async getTemplates() {\n        if (this.isProduction) {\n            return await _supabaseService__WEBPACK_IMPORTED_MODULE_0__.supabaseService.getTemplates();\n        } else {\n            const response = await fetch('/api/templates');\n            if (!response.ok) {\n                throw new Error('Failed to fetch templates');\n            }\n            return await response.json();\n        }\n    }\n    // Session Management\n    async createSession(data) {\n        if (this.isProduction) {\n            return await _supabaseService__WEBPACK_IMPORTED_MODULE_0__.supabaseService.createSession(data);\n        } else {\n            const response = await fetch('/api/sessions', {\n                method: 'POST',\n                headers: {\n                    'Content-Type': 'application/json'\n                },\n                body: JSON.stringify(data)\n            });\n            if (!response.ok) {\n                throw new Error('Failed to create session');\n            }\n            return await response.json();\n        }\n    }\n    async addMessageToSession(data) {\n        if (this.isProduction) {\n            return await _supabaseService__WEBPACK_IMPORTED_MODULE_0__.supabaseService.createMessage({\n                session_id: data.sessionId,\n                role: data.role,\n                content: data.content\n            });\n        } else {\n            const response = await fetch('/api/messages', {\n                method: 'POST',\n                headers: {\n                    'Content-Type': 'application/json'\n                },\n                body: JSON.stringify(data)\n            });\n            if (!response.ok) {\n                throw new Error('Failed to add message');\n            }\n            return await response.json();\n        }\n    }\n    async updateSessionMetrics(sessionId, metrics) {\n        if (this.isProduction) {\n            return await _supabaseService__WEBPACK_IMPORTED_MODULE_0__.supabaseService.updateSessionMetrics(sessionId, metrics);\n        } else {\n            const response = await fetch(\"/api/sessions/\".concat(sessionId, \"/metrics\"), {\n                method: 'PUT',\n                headers: {\n                    'Content-Type': 'application/json'\n                },\n                body: JSON.stringify(metrics)\n            });\n            if (!response.ok) {\n                throw new Error('Failed to update metrics');\n            }\n            return await response.json();\n        }\n    }\n    async getSessionWithDetails(sessionId) {\n        if (this.isProduction) {\n            return await _supabaseService__WEBPACK_IMPORTED_MODULE_0__.supabaseService.getSessionMessages(sessionId);\n        } else {\n            const response = await fetch(\"/api/sessions/\".concat(sessionId));\n            if (!response.ok) {\n                throw new Error('Failed to fetch session details');\n            }\n            return await response.json();\n        }\n    }\n    constructor(){\n        this.isProduction = process.env.NEXT_PUBLIC_ENV === 'production';\n    }\n}\nconst databaseService = DatabaseService.getInstance();\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9zZXJ2aWNlcy9kYXRhYmFzZVNlcnZpY2UudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQThDO0FBQ007QUFFcEQsMkJBQTJCO0FBQzNCLE1BQU1FLFNBQVMsSUFBSUYsd0RBQVlBO0FBRXhCLE1BQU1HO0lBUVgsT0FBY0MsY0FBK0I7UUFDM0MsSUFBSSxDQUFDRCxnQkFBZ0JFLFFBQVEsRUFBRTtZQUM3QkYsZ0JBQWdCRSxRQUFRLEdBQUcsSUFBSUY7UUFDakM7UUFDQSxPQUFPQSxnQkFBZ0JFLFFBQVE7SUFDakM7SUFFQSxzQkFBc0I7SUFDdEIsTUFBTUMsZUFBZUMsSUFLcEIsRUFBRTtRQUNELElBQUksSUFBSSxDQUFDQyxZQUFZLEVBQUU7WUFDckIsOEJBQThCO1lBQzlCLCtDQUErQztZQUMvQyxPQUFPLE1BQU1QLDZEQUFlQSxDQUFDSyxjQUFjLENBQUNDO1FBQzlDLE9BQU87WUFDTCxtQ0FBbUM7WUFDbkMsT0FBTyxNQUFNTCxPQUFPTyxpQkFBaUIsQ0FBQ0MsTUFBTSxDQUFDO2dCQUMzQ0gsTUFBTTtvQkFDSkksT0FBT0osS0FBS0ksS0FBSztvQkFDakJDLGFBQWFMLEtBQUtLLFdBQVc7b0JBQzdCQyxVQUFVTixLQUFLTSxRQUFRO29CQUN2QkMsT0FBTzt3QkFDTEosUUFBUUgsS0FBS08sS0FBSztvQkFDcEI7Z0JBQ0Y7Z0JBQ0FDLFNBQVM7b0JBQ1BELE9BQU87Z0JBQ1Q7WUFDRjtRQUNGO0lBQ0Y7SUFFQSxNQUFNRSxlQUFlO1FBQ25CLElBQUksSUFBSSxDQUFDUixZQUFZLEVBQUU7WUFDckIsT0FBTyxNQUFNUCw2REFBZUEsQ0FBQ2UsWUFBWTtRQUMzQyxPQUFPO1lBQ0wsTUFBTUMsV0FBVyxNQUFNQyxNQUFNO1lBQzdCLElBQUksQ0FBQ0QsU0FBU0UsRUFBRSxFQUFFO2dCQUNoQixNQUFNLElBQUlDLE1BQU07WUFDbEI7WUFDQSxPQUFPLE1BQU1ILFNBQVNJLElBQUk7UUFDNUI7SUFDRjtJQUVBLHFCQUFxQjtJQUNyQixNQUFNQyxjQUFjZixJQUluQixFQUFFO1FBQ0QsSUFBSSxJQUFJLENBQUNDLFlBQVksRUFBRTtZQUNyQixPQUFPLE1BQU1QLDZEQUFlQSxDQUFDcUIsYUFBYSxDQUFDZjtRQUM3QyxPQUFPO1lBQ0wsTUFBTVUsV0FBVyxNQUFNQyxNQUFNLGlCQUFpQjtnQkFDNUNLLFFBQVE7Z0JBQ1JDLFNBQVM7b0JBQ1AsZ0JBQWdCO2dCQUNsQjtnQkFDQUMsTUFBTUMsS0FBS0MsU0FBUyxDQUFDcEI7WUFDdkI7WUFDQSxJQUFJLENBQUNVLFNBQVNFLEVBQUUsRUFBRTtnQkFDaEIsTUFBTSxJQUFJQyxNQUFNO1lBQ2xCO1lBQ0EsT0FBTyxNQUFNSCxTQUFTSSxJQUFJO1FBQzVCO0lBQ0Y7SUFFQSxNQUFNTyxvQkFBb0JyQixJQU16QixFQUFFO1FBQ0QsSUFBSSxJQUFJLENBQUNDLFlBQVksRUFBRTtZQUNyQixPQUFPLE1BQU1QLDZEQUFlQSxDQUFDNEIsYUFBYSxDQUFDO2dCQUN6Q0MsWUFBWXZCLEtBQUt3QixTQUFTO2dCQUMxQkMsTUFBTXpCLEtBQUt5QixJQUFJO2dCQUNmQyxTQUFTMUIsS0FBSzBCLE9BQU87WUFDdkI7UUFDRixPQUFPO1lBQ0wsTUFBTWhCLFdBQVcsTUFBTUMsTUFBTSxpQkFBaUI7Z0JBQzVDSyxRQUFRO2dCQUNSQyxTQUFTO29CQUNQLGdCQUFnQjtnQkFDbEI7Z0JBQ0FDLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQ3BCO1lBQ3ZCO1lBQ0EsSUFBSSxDQUFDVSxTQUFTRSxFQUFFLEVBQUU7Z0JBQ2hCLE1BQU0sSUFBSUMsTUFBTTtZQUNsQjtZQUNBLE9BQU8sTUFBTUgsU0FBU0ksSUFBSTtRQUM1QjtJQUNGO0lBRUEsTUFBTWEscUJBQXFCSCxTQUFpQixFQUFFSSxPQVE3QyxFQUFFO1FBQ0QsSUFBSSxJQUFJLENBQUMzQixZQUFZLEVBQUU7WUFDckIsT0FBTyxNQUFNUCw2REFBZUEsQ0FBQ2lDLG9CQUFvQixDQUFDSCxXQUFXSTtRQUMvRCxPQUFPO1lBQ0wsTUFBTWxCLFdBQVcsTUFBTUMsTUFBTSxpQkFBMkIsT0FBVmEsV0FBVSxhQUFXO2dCQUNqRVIsUUFBUTtnQkFDUkMsU0FBUztvQkFDUCxnQkFBZ0I7Z0JBQ2xCO2dCQUNBQyxNQUFNQyxLQUFLQyxTQUFTLENBQUNRO1lBQ3ZCO1lBQ0EsSUFBSSxDQUFDbEIsU0FBU0UsRUFBRSxFQUFFO2dCQUNoQixNQUFNLElBQUlDLE1BQU07WUFDbEI7WUFDQSxPQUFPLE1BQU1ILFNBQVNJLElBQUk7UUFDNUI7SUFDRjtJQUVBLE1BQU1lLHNCQUFzQkwsU0FBaUIsRUFBRTtRQUM3QyxJQUFJLElBQUksQ0FBQ3ZCLFlBQVksRUFBRTtZQUNyQixPQUFPLE1BQU1QLDZEQUFlQSxDQUFDb0Msa0JBQWtCLENBQUNOO1FBQ2xELE9BQU87WUFDTCxNQUFNZCxXQUFXLE1BQU1DLE1BQU0saUJBQTJCLE9BQVZhO1lBQzlDLElBQUksQ0FBQ2QsU0FBU0UsRUFBRSxFQUFFO2dCQUNoQixNQUFNLElBQUlDLE1BQU07WUFDbEI7WUFDQSxPQUFPLE1BQU1ILFNBQVNJLElBQUk7UUFDNUI7SUFDRjtJQTNJQSxhQUFzQjtRQUNwQixJQUFJLENBQUNiLFlBQVksR0FBRzhCLE9BQU9BLENBQUNDLEdBQUcsQ0FBQ0MsZUFBZSxLQUFLO0lBQ3REO0FBMElGO0FBRU8sTUFBTUMsa0JBQWtCdEMsZ0JBQWdCQyxXQUFXLEdBQUciLCJzb3VyY2VzIjpbIkU6XFxTVEFORCBBTE9ORSBBUFBcXHNyY1xcc2VydmljZXNcXGRhdGFiYXNlU2VydmljZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XG5pbXBvcnQgeyBzdXBhYmFzZVNlcnZpY2UgfSBmcm9tICcuL3N1cGFiYXNlU2VydmljZSc7XG5cbi8vIEluaXRpYWxpemUgUHJpc21hIENsaWVudFxuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xuXG5leHBvcnQgY2xhc3MgRGF0YWJhc2VTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IERhdGFiYXNlU2VydmljZTtcbiAgcHJpdmF0ZSBpc1Byb2R1Y3Rpb246IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmlzUHJvZHVjdGlvbiA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0VOViA9PT0gJ3Byb2R1Y3Rpb24nO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBEYXRhYmFzZVNlcnZpY2Uge1xuICAgIGlmICghRGF0YWJhc2VTZXJ2aWNlLmluc3RhbmNlKSB7XG4gICAgICBEYXRhYmFzZVNlcnZpY2UuaW5zdGFuY2UgPSBuZXcgRGF0YWJhc2VTZXJ2aWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBEYXRhYmFzZVNlcnZpY2UuaW5zdGFuY2U7XG4gIH1cblxuICAvLyBUZW1wbGF0ZSBNYW5hZ2VtZW50XG4gIGFzeW5jIGNyZWF0ZVRlbXBsYXRlKGRhdGE6IHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgZHVyYXRpb246IG51bWJlcjtcbiAgICBwYXJ0czogeyBwYXJ0OiBudW1iZXI7IHByb21wdDogc3RyaW5nOyB9W107XG4gIH0pIHtcbiAgICBpZiAodGhpcy5pc1Byb2R1Y3Rpb24pIHtcbiAgICAgIC8vIEluIHByb2R1Y3Rpb24sIHVzZSBTdXBhYmFzZVxuICAgICAgLy8gQ29udmVydCB0aGUgZGF0YSBzdHJ1Y3R1cmUgdG8gbWF0Y2ggU3VwYWJhc2VcbiAgICAgIHJldHVybiBhd2FpdCBzdXBhYmFzZVNlcnZpY2UuY3JlYXRlVGVtcGxhdGUoZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEluIGRldmVsb3BtZW50LCB1c2UgbG9jYWwgUHJpc21hXG4gICAgICByZXR1cm4gYXdhaXQgcHJpc21hLnNwZWFraW5nX1RlbXBsYXRlLmNyZWF0ZSh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB0aXRsZTogZGF0YS50aXRsZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogZGF0YS5kZXNjcmlwdGlvbixcbiAgICAgICAgICBkdXJhdGlvbjogZGF0YS5kdXJhdGlvbixcbiAgICAgICAgICBwYXJ0czoge1xuICAgICAgICAgICAgY3JlYXRlOiBkYXRhLnBhcnRzXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgcGFydHM6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZ2V0VGVtcGxhdGVzKCkge1xuICAgIGlmICh0aGlzLmlzUHJvZHVjdGlvbikge1xuICAgICAgcmV0dXJuIGF3YWl0IHN1cGFiYXNlU2VydmljZS5nZXRUZW1wbGF0ZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS90ZW1wbGF0ZXMnKTtcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggdGVtcGxhdGVzJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFNlc3Npb24gTWFuYWdlbWVudFxuICBhc3luYyBjcmVhdGVTZXNzaW9uKGRhdGE6IHtcbiAgICB1c2VySWQ6IHN0cmluZztcbiAgICB0ZW1wbGF0ZUlkOiBzdHJpbmc7XG4gICAgZHVyYXRpb246IG51bWJlcjtcbiAgfSkge1xuICAgIGlmICh0aGlzLmlzUHJvZHVjdGlvbikge1xuICAgICAgcmV0dXJuIGF3YWl0IHN1cGFiYXNlU2VydmljZS5jcmVhdGVTZXNzaW9uKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL3Nlc3Npb25zJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgfSk7XG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGNyZWF0ZSBzZXNzaW9uJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFkZE1lc3NhZ2VUb1Nlc3Npb24oZGF0YToge1xuICAgIHNlc3Npb25JZDogc3RyaW5nO1xuICAgIGNvbnRlbnQ6IHN0cmluZztcbiAgICByb2xlOiAndXNlcicgfCAnYXNzaXN0YW50JztcbiAgICByZXNwb25zZVRpbWU/OiBudW1iZXI7XG4gICAgd29yZENvdW50PzogbnVtYmVyO1xuICB9KSB7XG4gICAgaWYgKHRoaXMuaXNQcm9kdWN0aW9uKSB7XG4gICAgICByZXR1cm4gYXdhaXQgc3VwYWJhc2VTZXJ2aWNlLmNyZWF0ZU1lc3NhZ2Uoe1xuICAgICAgICBzZXNzaW9uX2lkOiBkYXRhLnNlc3Npb25JZCxcbiAgICAgICAgcm9sZTogZGF0YS5yb2xlLFxuICAgICAgICBjb250ZW50OiBkYXRhLmNvbnRlbnRcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL21lc3NhZ2VzJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgfSk7XG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGFkZCBtZXNzYWdlJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZVNlc3Npb25NZXRyaWNzKHNlc3Npb25JZDogc3RyaW5nLCBtZXRyaWNzOiB7XG4gICAgcHJvbnVuY2lhdGlvbjogbnVtYmVyO1xuICAgIGdyYW1tYXI6IG51bWJlcjtcbiAgICB2b2NhYnVsYXJ5OiBudW1iZXI7XG4gICAgZmx1ZW5jeTogbnVtYmVyO1xuICAgIGNvaGVyZW5jZTogbnVtYmVyO1xuICAgIGF2ZXJhZ2VSZXNwb25zZVRpbWU6IG51bWJlcjtcbiAgICB0b3RhbFdvcmRzOiBudW1iZXI7XG4gIH0pIHtcbiAgICBpZiAodGhpcy5pc1Byb2R1Y3Rpb24pIHtcbiAgICAgIHJldHVybiBhd2FpdCBzdXBhYmFzZVNlcnZpY2UudXBkYXRlU2Vzc2lvbk1ldHJpY3Moc2Vzc2lvbklkLCBtZXRyaWNzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FwaS9zZXNzaW9ucy8ke3Nlc3Npb25JZH0vbWV0cmljc2AsIHtcbiAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG1ldHJpY3MpLFxuICAgICAgfSk7XG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIHVwZGF0ZSBtZXRyaWNzJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldFNlc3Npb25XaXRoRGV0YWlscyhzZXNzaW9uSWQ6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmlzUHJvZHVjdGlvbikge1xuICAgICAgcmV0dXJuIGF3YWl0IHN1cGFiYXNlU2VydmljZS5nZXRTZXNzaW9uTWVzc2FnZXMoc2Vzc2lvbklkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FwaS9zZXNzaW9ucy8ke3Nlc3Npb25JZH1gKTtcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggc2Vzc2lvbiBkZXRhaWxzJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZGF0YWJhc2VTZXJ2aWNlID0gRGF0YWJhc2VTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50Iiwic3VwYWJhc2VTZXJ2aWNlIiwicHJpc21hIiwiRGF0YWJhc2VTZXJ2aWNlIiwiZ2V0SW5zdGFuY2UiLCJpbnN0YW5jZSIsImNyZWF0ZVRlbXBsYXRlIiwiZGF0YSIsImlzUHJvZHVjdGlvbiIsInNwZWFraW5nX1RlbXBsYXRlIiwiY3JlYXRlIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImR1cmF0aW9uIiwicGFydHMiLCJpbmNsdWRlIiwiZ2V0VGVtcGxhdGVzIiwicmVzcG9uc2UiLCJmZXRjaCIsIm9rIiwiRXJyb3IiLCJqc29uIiwiY3JlYXRlU2Vzc2lvbiIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImFkZE1lc3NhZ2VUb1Nlc3Npb24iLCJjcmVhdGVNZXNzYWdlIiwic2Vzc2lvbl9pZCIsInNlc3Npb25JZCIsInJvbGUiLCJjb250ZW50IiwidXBkYXRlU2Vzc2lvbk1ldHJpY3MiLCJtZXRyaWNzIiwiZ2V0U2Vzc2lvbldpdGhEZXRhaWxzIiwiZ2V0U2Vzc2lvbk1lc3NhZ2VzIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0VOViIsImRhdGFiYXNlU2VydmljZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/services/databaseService.ts\n"));

/***/ })

});