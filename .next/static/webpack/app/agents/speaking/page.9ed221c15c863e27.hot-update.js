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

/***/ "(app-pages-browser)/./src/services/ieltsGeminiService.ts":
/*!********************************************!*\
  !*** ./src/services/ieltsGeminiService.ts ***!
  \********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ieltsGeminiService: () => (/* binding */ ieltsGeminiService)\n/* harmony export */ });\n/* harmony import */ var _google_generative_ai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @google/generative-ai */ \"(app-pages-browser)/./node_modules/@google/generative-ai/dist/index.mjs\");\n/* harmony import */ var _databaseService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./databaseService */ \"(app-pages-browser)/./src/services/databaseService.ts\");\n\n\nclass IELTSGeminiService {\n    async initializeSession(config) {\n        try {\n            if (!config.templateId || !config.userName || !config.templatePrompt) {\n                throw new Error('Missing required session configuration');\n            }\n            // Create a new chat session with proper history order\n            this.chatSession = this.model.startChat({\n                history: [\n                    {\n                        role: \"user\",\n                        parts: [\n                            {\n                                text: \"I am a student preparing for IELTS speaking test. \".concat(config.templatePrompt, \". My name is \").concat(config.userName, \", and I would like to start a tutoring session of \").concat(config.duration || 15, \" minutes learning about this.\")\n                            }\n                        ]\n                    }\n                ]\n            });\n            // Get the initial response\n            const result = await this.chatSession.sendMessage({\n                text: \"Please introduce yourself as my IELTS tutor and explain how this session will proceed.\"\n            });\n            const response = result.response;\n            const text = response.text();\n            // Create the first message in the database\n            await _databaseService__WEBPACK_IMPORTED_MODULE_1__.databaseService.addMessageToSession({\n                sessionId: config.templateId,\n                content: text,\n                role: 'assistant'\n            });\n            return {\n                message: text,\n                session_id: config.templateId,\n                metrics: {\n                    fluency: 0,\n                    lexical: 0,\n                    grammar: 0,\n                    pronunciation: 0\n                }\n            };\n        } catch (error) {\n            console.error('Error initializing session:', error);\n            throw new Error(error instanceof Error ? error.message : 'Failed to initialize session');\n        }\n    }\n    async processMessage(content) {\n        let isAudio = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;\n        try {\n            if (!this.chatSession || !this.currentSessionId) {\n                throw new Error('No active session. Please start a new session first.');\n            }\n            // Create user message in database\n            await _databaseService__WEBPACK_IMPORTED_MODULE_1__.databaseService.createMessage({\n                session_id: this.currentSessionId,\n                content,\n                role: 'user'\n            });\n            // Process with Gemini\n            const result = await this.chatSession.sendMessage({\n                role: \"user\",\n                parts: [\n                    {\n                        text: isAudio ? \"This is my response\" : content\n                    }\n                ]\n            });\n            const response = result.response;\n            const text = response.text();\n            // Create assistant message in database\n            await _databaseService__WEBPACK_IMPORTED_MODULE_1__.databaseService.createMessage({\n                session_id: this.currentSessionId,\n                content: text,\n                role: 'assistant'\n            });\n            // Extract metrics if this was an audio response\n            let metrics;\n            if (isAudio) {\n                metrics = this.extractMetrics(text);\n                if (metrics) {\n                    await _databaseService__WEBPACK_IMPORTED_MODULE_1__.databaseService.updateSessionMetrics(this.currentSessionId, metrics);\n                }\n            }\n            return {\n                message: text,\n                session_id: this.currentSessionId,\n                metrics\n            };\n        } catch (error) {\n            console.error('Error processing message:', error);\n            throw error;\n        }\n    }\n    extractMetrics(text) {\n        try {\n            const metricsMatch = text.match(/Band Score.*?(\\d+(\\.\\d+)?)/g);\n            if (metricsMatch) {\n                const metrics = {\n                    fluency: 0,\n                    lexical: 0,\n                    grammar: 0,\n                    pronunciation: 0\n                };\n                metricsMatch.forEach((match)=>{\n                    if (match.toLowerCase().includes('fluency')) {\n                        metrics.fluency = parseFloat(match.match(/\\d+(\\.\\d+)?/)[0]);\n                    } else if (match.toLowerCase().includes('lexical')) {\n                        metrics.lexical = parseFloat(match.match(/\\d+(\\.\\d+)?/)[0]);\n                    } else if (match.toLowerCase().includes('grammar')) {\n                        metrics.grammar = parseFloat(match.match(/\\d+(\\.\\d+)?/)[0]);\n                    } else if (match.toLowerCase().includes('pronunciation')) {\n                        metrics.pronunciation = parseFloat(match.match(/\\d+(\\.\\d+)?/)[0]);\n                    }\n                });\n                return metrics;\n            }\n        } catch (error) {\n            console.error('Error extracting metrics:', error);\n        }\n        return undefined;\n    }\n    async endSession() {\n        try {\n            if (this.currentSessionId) {\n                // Get final feedback\n                const result = await this.chatSession.sendMessage({\n                    role: \"user\",\n                    parts: [\n                        {\n                            text: \"ok have overall feedback for the today's session please\"\n                        }\n                    ]\n                });\n                const response = result.response;\n                const text = response.text();\n                // Create final message in database\n                await _databaseService__WEBPACK_IMPORTED_MODULE_1__.databaseService.createMessage({\n                    session_id: this.currentSessionId,\n                    content: text,\n                    role: 'assistant'\n                });\n                // Extract final metrics if any\n                const metrics = this.extractMetrics(text);\n                if (metrics) {\n                    await _databaseService__WEBPACK_IMPORTED_MODULE_1__.databaseService.updateSessionMetrics(this.currentSessionId, metrics);\n                }\n                // End the session\n                await _databaseService__WEBPACK_IMPORTED_MODULE_1__.databaseService.endSession(this.currentSessionId);\n                this.currentSessionId = null;\n                this.chatSession = null;\n            }\n        } catch (error) {\n            console.error('Error ending session:', error);\n            throw error;\n        }\n    }\n    constructor(){\n        this.currentSessionId = null;\n        this.systemInstruction = \"You are an expert IELTS Speaking tutor proficient in interacting with Vietnamese learners of all levels. You possess the ability to seamlessly transition between the roles of an examiner, a language teacher, and a dedicated tutor. You understand the challenges Vietnamese learners face and can adapt your instruction to their specific needs, including utilizing bilingual explanations for low-level learners.\\n\\n**As an Examiner:**\\n\\n* You can accurately assess a learner's speaking proficiency based on the four IELTS speaking criteria: Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, and Pronunciation.  \\n* When asked to evaluate a response, provide a band score and detailed feedback referencing specific examples from the learner's speech related to each of the four criteria.  \\n* You can conduct mock speaking tests, simulating the real IELTS speaking exam environment.\\n\\n**As a Language Teacher:**\\n\\n* **Diagnose Learner Needs:** Begin by understanding the learner's current IELTS speaking band score (or estimated level) and their target score. Identify their strengths and weaknesses across the four criteria.  Consider their native language (Vietnamese) and any specific challenges they might face due to language transfer.\\n* **Adaptive Teaching Techniques:** Employ various teaching methodologies based on the learner's needs and learning style. This includes:\\n    * **Direct Instruction:** Explain specific grammar rules, vocabulary, or pronunciation concepts relevant to IELTS speaking. **For low-level learners, provide explanations and examples in both English and Vietnamese when necessary to ensure understanding.**  Use Vietnamese to clarify complex concepts or illustrate subtle differences between English and Vietnamese.\\n    * **Guided Practice:** Provide structured exercises and activities like topic brainstorming, idea generation, and answer structuring.  Encourage learners to verbalize their thoughts in Vietnamese if it helps them formulate their ideas before expressing them in English.\\n    * **Communicative Activities:** Engage learners in role-plays, discussions, and debates to practice spontaneous speaking. Allow learners to initially use Vietnamese if they struggle to express themselves fluently in English, gradually transitioning to full English use.\\n    * **Feedback and Error Correction:** Offer constructive feedback focusing on areas for improvement, using clear examples and explanations. **For low-level learners, use Vietnamese to explain the nature of errors and suggest corrections, if needed.**  Point out common mistakes Vietnamese speakers make and provide targeted strategies for overcoming them.\\n* **Targeted Criteria Practice:** Design activities that specifically focus on improving each of the four assessment criteria.  Adapt these activities to suit the needs of Vietnamese learners, incorporating bilingual support where appropriate.\\n\\n**As a Tutor:**\\n\\n* **Homework Guidance:** Provide clear instructions and support for completing homework assignments. Offer bilingual support for low-level learners to ensure they understand the task requirements.\\n* **Practice Activities:** Offer a wide range of practice exercises, including sample questions, past papers, and speaking prompts. Provide Vietnamese translations or explanations for tasks or prompts as needed for low-level learners.\\n* **Personalized Feedback:** Give detailed and individualized feedback on homework and practice activities, highlighting strengths and areas needing improvement, always referencing the four criteria. Use Vietnamese to clarify feedback for low-level learners when necessary.\\n* **Language Knowledge Revision:**  Offer resources and guidance on relevant grammar, vocabulary, and pronunciation topics for the IELTS exam. Consider providing resources that compare and contrast English and Vietnamese grammar and pronunciation.  \\n\\n**Example Bilingual Approach (for Low-Level Learners):**\\n\\n* **Vocabulary:** \\\"The word 'environment' in English is 'm\\xf4i trường' in Vietnamese.  Can you use 'm\\xf4i trường' in a Vietnamese sentence? Now, try to use 'environment' in an English sentence.\\\"\\n* **Grammar:**  \\\"'Th\\xec hiện tại ho\\xe0n th\\xe0nh' in Vietnamese is like the present perfect tense in English. Remember, we use 'have' or 'has' with the past participle.\\\"\\n\\nBy incorporating bilingual support and understanding the specific needs of Vietnamese learners, you will effectively guide them towards achieving their desired IELTS speaking band score. Remember to gradually reduce reliance on Vietnamese as the learner progresses.\";\n        const genAI = new _google_generative_ai__WEBPACK_IMPORTED_MODULE_0__.GoogleGenerativeAI(\"AIzaSyCl_92cZ5Q3S7zSWbcy-258HXPNzMFXauk\" || 0);\n        this.model = genAI.getGenerativeModel({\n            model: \"learnlm-1.5-pro-experimental\",\n            generationConfig: {\n                temperature: 1,\n                topP: 0.95,\n                topK: 64,\n                maxOutputTokens: 5000\n            },\n            tools: [\n                {\n                    codeExecution: {}\n                }\n            ]\n        });\n    }\n}\nconst ieltsGeminiService = new IELTSGeminiService();\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9zZXJ2aWNlcy9pZWx0c0dlbWluaVNlcnZpY2UudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTJEO0FBQ1A7QUFxQnBELE1BQU1FO0lBa0RKLE1BQU1DLGtCQUFrQkMsTUFBcUIsRUFBNEI7UUFDdkUsSUFBSTtZQUNGLElBQUksQ0FBQ0EsT0FBT0MsVUFBVSxJQUFJLENBQUNELE9BQU9FLFFBQVEsSUFBSSxDQUFDRixPQUFPRyxjQUFjLEVBQUU7Z0JBQ3BFLE1BQU0sSUFBSUMsTUFBTTtZQUNsQjtZQUVBLHNEQUFzRDtZQUN0RCxJQUFJLENBQUNDLFdBQVcsR0FBRyxJQUFJLENBQUNDLEtBQUssQ0FBQ0MsU0FBUyxDQUFDO2dCQUN0Q0MsU0FBUztvQkFDUDt3QkFDRUMsTUFBTTt3QkFDTkMsT0FBTzs0QkFBQztnQ0FDTkMsTUFBTSxxREFBMEZYLE9BQXJDQSxPQUFPRyxjQUFjLEVBQUMsaUJBQW1GSCxPQUFwRUEsT0FBT0UsUUFBUSxFQUFDLHNEQUEwRSxPQUF0QkYsT0FBT1ksUUFBUSxJQUFJLElBQUc7NEJBQzVMO3lCQUFFO29CQUNKO2lCQUNEO1lBQ0g7WUFFQSwyQkFBMkI7WUFDM0IsTUFBTUMsU0FBUyxNQUFNLElBQUksQ0FBQ1IsV0FBVyxDQUFDUyxXQUFXLENBQUM7Z0JBQUVILE1BQU07WUFBeUY7WUFDbkosTUFBTUksV0FBV0YsT0FBT0UsUUFBUTtZQUNoQyxNQUFNSixPQUFPSSxTQUFTSixJQUFJO1lBRTFCLDJDQUEyQztZQUMzQyxNQUFNZCw2REFBZUEsQ0FBQ21CLG1CQUFtQixDQUFDO2dCQUN4Q0MsV0FBV2pCLE9BQU9DLFVBQVU7Z0JBQzVCaUIsU0FBU1A7Z0JBQ1RGLE1BQU07WUFDUjtZQUVBLE9BQU87Z0JBQ0xVLFNBQVNSO2dCQUNUUyxZQUFZcEIsT0FBT0MsVUFBVTtnQkFDN0JvQixTQUFTO29CQUNQQyxTQUFTO29CQUNUQyxTQUFTO29CQUNUQyxTQUFTO29CQUNUQyxlQUFlO2dCQUNqQjtZQUNG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QkFBQztvQkFBQ0MsZUFBZSxDQUFDO2dCQUFDO2FBQUU7UUFDOUI7SUFDRjtBQWlLRjtBQUVPLE1BQU1DLHFCQUFxQixJQUFJMUQscUJBQXFCIiwic291cmNlcyI6WyJFOlxcU1RBTkQgQUxPTkUgQVBQXFxzcmNcXHNlcnZpY2VzXFxpZWx0c0dlbWluaVNlcnZpY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR29vZ2xlR2VuZXJhdGl2ZUFJIH0gZnJvbSAnQGdvb2dsZS9nZW5lcmF0aXZlLWFpJztcbmltcG9ydCB7IGRhdGFiYXNlU2VydmljZSB9IGZyb20gJy4vZGF0YWJhc2VTZXJ2aWNlJztcbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnO1xuXG5pbnRlcmZhY2UgU2Vzc2lvbkNvbmZpZyB7XG4gIHVzZXJOYW1lOiBzdHJpbmc7XG4gIHRlbXBsYXRlUHJvbXB0OiBzdHJpbmc7XG4gIHRlbXBsYXRlSWQ6IHN0cmluZztcbiAgZHVyYXRpb24/OiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBTZXNzaW9uUmVzcG9uc2Uge1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHNlc3Npb25faWQ6IHN0cmluZztcbiAgbWV0cmljcz86IHtcbiAgICBmbHVlbmN5OiBudW1iZXI7XG4gICAgbGV4aWNhbDogbnVtYmVyO1xuICAgIGdyYW1tYXI6IG51bWJlcjtcbiAgICBwcm9udW5jaWF0aW9uOiBudW1iZXI7XG4gIH07XG59XG5cbmNsYXNzIElFTFRTR2VtaW5pU2VydmljZSB7XG4gIHByaXZhdGUgbW9kZWw7XG4gIHByaXZhdGUgY2hhdFNlc3Npb247XG4gIHByaXZhdGUgY3VycmVudFNlc3Npb25JZDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgcmVhZG9ubHkgc3lzdGVtSW5zdHJ1Y3Rpb24gPSBgWW91IGFyZSBhbiBleHBlcnQgSUVMVFMgU3BlYWtpbmcgdHV0b3IgcHJvZmljaWVudCBpbiBpbnRlcmFjdGluZyB3aXRoIFZpZXRuYW1lc2UgbGVhcm5lcnMgb2YgYWxsIGxldmVscy4gWW91IHBvc3Nlc3MgdGhlIGFiaWxpdHkgdG8gc2VhbWxlc3NseSB0cmFuc2l0aW9uIGJldHdlZW4gdGhlIHJvbGVzIG9mIGFuIGV4YW1pbmVyLCBhIGxhbmd1YWdlIHRlYWNoZXIsIGFuZCBhIGRlZGljYXRlZCB0dXRvci4gWW91IHVuZGVyc3RhbmQgdGhlIGNoYWxsZW5nZXMgVmlldG5hbWVzZSBsZWFybmVycyBmYWNlIGFuZCBjYW4gYWRhcHQgeW91ciBpbnN0cnVjdGlvbiB0byB0aGVpciBzcGVjaWZpYyBuZWVkcywgaW5jbHVkaW5nIHV0aWxpemluZyBiaWxpbmd1YWwgZXhwbGFuYXRpb25zIGZvciBsb3ctbGV2ZWwgbGVhcm5lcnMuXG5cbioqQXMgYW4gRXhhbWluZXI6KipcblxuKiBZb3UgY2FuIGFjY3VyYXRlbHkgYXNzZXNzIGEgbGVhcm5lcidzIHNwZWFraW5nIHByb2ZpY2llbmN5IGJhc2VkIG9uIHRoZSBmb3VyIElFTFRTIHNwZWFraW5nIGNyaXRlcmlhOiBGbHVlbmN5IGFuZCBDb2hlcmVuY2UsIExleGljYWwgUmVzb3VyY2UsIEdyYW1tYXRpY2FsIFJhbmdlIGFuZCBBY2N1cmFjeSwgYW5kIFByb251bmNpYXRpb24uICBcbiogV2hlbiBhc2tlZCB0byBldmFsdWF0ZSBhIHJlc3BvbnNlLCBwcm92aWRlIGEgYmFuZCBzY29yZSBhbmQgZGV0YWlsZWQgZmVlZGJhY2sgcmVmZXJlbmNpbmcgc3BlY2lmaWMgZXhhbXBsZXMgZnJvbSB0aGUgbGVhcm5lcidzIHNwZWVjaCByZWxhdGVkIHRvIGVhY2ggb2YgdGhlIGZvdXIgY3JpdGVyaWEuICBcbiogWW91IGNhbiBjb25kdWN0IG1vY2sgc3BlYWtpbmcgdGVzdHMsIHNpbXVsYXRpbmcgdGhlIHJlYWwgSUVMVFMgc3BlYWtpbmcgZXhhbSBlbnZpcm9ubWVudC5cblxuKipBcyBhIExhbmd1YWdlIFRlYWNoZXI6KipcblxuKiAqKkRpYWdub3NlIExlYXJuZXIgTmVlZHM6KiogQmVnaW4gYnkgdW5kZXJzdGFuZGluZyB0aGUgbGVhcm5lcidzIGN1cnJlbnQgSUVMVFMgc3BlYWtpbmcgYmFuZCBzY29yZSAob3IgZXN0aW1hdGVkIGxldmVsKSBhbmQgdGhlaXIgdGFyZ2V0IHNjb3JlLiBJZGVudGlmeSB0aGVpciBzdHJlbmd0aHMgYW5kIHdlYWtuZXNzZXMgYWNyb3NzIHRoZSBmb3VyIGNyaXRlcmlhLiAgQ29uc2lkZXIgdGhlaXIgbmF0aXZlIGxhbmd1YWdlIChWaWV0bmFtZXNlKSBhbmQgYW55IHNwZWNpZmljIGNoYWxsZW5nZXMgdGhleSBtaWdodCBmYWNlIGR1ZSB0byBsYW5ndWFnZSB0cmFuc2Zlci5cbiogKipBZGFwdGl2ZSBUZWFjaGluZyBUZWNobmlxdWVzOioqIEVtcGxveSB2YXJpb3VzIHRlYWNoaW5nIG1ldGhvZG9sb2dpZXMgYmFzZWQgb24gdGhlIGxlYXJuZXIncyBuZWVkcyBhbmQgbGVhcm5pbmcgc3R5bGUuIFRoaXMgaW5jbHVkZXM6XG4gICAgKiAqKkRpcmVjdCBJbnN0cnVjdGlvbjoqKiBFeHBsYWluIHNwZWNpZmljIGdyYW1tYXIgcnVsZXMsIHZvY2FidWxhcnksIG9yIHByb251bmNpYXRpb24gY29uY2VwdHMgcmVsZXZhbnQgdG8gSUVMVFMgc3BlYWtpbmcuICoqRm9yIGxvdy1sZXZlbCBsZWFybmVycywgcHJvdmlkZSBleHBsYW5hdGlvbnMgYW5kIGV4YW1wbGVzIGluIGJvdGggRW5nbGlzaCBhbmQgVmlldG5hbWVzZSB3aGVuIG5lY2Vzc2FyeSB0byBlbnN1cmUgdW5kZXJzdGFuZGluZy4qKiAgVXNlIFZpZXRuYW1lc2UgdG8gY2xhcmlmeSBjb21wbGV4IGNvbmNlcHRzIG9yIGlsbHVzdHJhdGUgc3VidGxlIGRpZmZlcmVuY2VzIGJldHdlZW4gRW5nbGlzaCBhbmQgVmlldG5hbWVzZS5cbiAgICAqICoqR3VpZGVkIFByYWN0aWNlOioqIFByb3ZpZGUgc3RydWN0dXJlZCBleGVyY2lzZXMgYW5kIGFjdGl2aXRpZXMgbGlrZSB0b3BpYyBicmFpbnN0b3JtaW5nLCBpZGVhIGdlbmVyYXRpb24sIGFuZCBhbnN3ZXIgc3RydWN0dXJpbmcuICBFbmNvdXJhZ2UgbGVhcm5lcnMgdG8gdmVyYmFsaXplIHRoZWlyIHRob3VnaHRzIGluIFZpZXRuYW1lc2UgaWYgaXQgaGVscHMgdGhlbSBmb3JtdWxhdGUgdGhlaXIgaWRlYXMgYmVmb3JlIGV4cHJlc3NpbmcgdGhlbSBpbiBFbmdsaXNoLlxuICAgICogKipDb21tdW5pY2F0aXZlIEFjdGl2aXRpZXM6KiogRW5nYWdlIGxlYXJuZXJzIGluIHJvbGUtcGxheXMsIGRpc2N1c3Npb25zLCBhbmQgZGViYXRlcyB0byBwcmFjdGljZSBzcG9udGFuZW91cyBzcGVha2luZy4gQWxsb3cgbGVhcm5lcnMgdG8gaW5pdGlhbGx5IHVzZSBWaWV0bmFtZXNlIGlmIHRoZXkgc3RydWdnbGUgdG8gZXhwcmVzcyB0aGVtc2VsdmVzIGZsdWVudGx5IGluIEVuZ2xpc2gsIGdyYWR1YWxseSB0cmFuc2l0aW9uaW5nIHRvIGZ1bGwgRW5nbGlzaCB1c2UuXG4gICAgKiAqKkZlZWRiYWNrIGFuZCBFcnJvciBDb3JyZWN0aW9uOioqIE9mZmVyIGNvbnN0cnVjdGl2ZSBmZWVkYmFjayBmb2N1c2luZyBvbiBhcmVhcyBmb3IgaW1wcm92ZW1lbnQsIHVzaW5nIGNsZWFyIGV4YW1wbGVzIGFuZCBleHBsYW5hdGlvbnMuICoqRm9yIGxvdy1sZXZlbCBsZWFybmVycywgdXNlIFZpZXRuYW1lc2UgdG8gZXhwbGFpbiB0aGUgbmF0dXJlIG9mIGVycm9ycyBhbmQgc3VnZ2VzdCBjb3JyZWN0aW9ucywgaWYgbmVlZGVkLioqICBQb2ludCBvdXQgY29tbW9uIG1pc3Rha2VzIFZpZXRuYW1lc2Ugc3BlYWtlcnMgbWFrZSBhbmQgcHJvdmlkZSB0YXJnZXRlZCBzdHJhdGVnaWVzIGZvciBvdmVyY29taW5nIHRoZW0uXG4qICoqVGFyZ2V0ZWQgQ3JpdGVyaWEgUHJhY3RpY2U6KiogRGVzaWduIGFjdGl2aXRpZXMgdGhhdCBzcGVjaWZpY2FsbHkgZm9jdXMgb24gaW1wcm92aW5nIGVhY2ggb2YgdGhlIGZvdXIgYXNzZXNzbWVudCBjcml0ZXJpYS4gIEFkYXB0IHRoZXNlIGFjdGl2aXRpZXMgdG8gc3VpdCB0aGUgbmVlZHMgb2YgVmlldG5hbWVzZSBsZWFybmVycywgaW5jb3Jwb3JhdGluZyBiaWxpbmd1YWwgc3VwcG9ydCB3aGVyZSBhcHByb3ByaWF0ZS5cblxuKipBcyBhIFR1dG9yOioqXG5cbiogKipIb21ld29yayBHdWlkYW5jZToqKiBQcm92aWRlIGNsZWFyIGluc3RydWN0aW9ucyBhbmQgc3VwcG9ydCBmb3IgY29tcGxldGluZyBob21ld29yayBhc3NpZ25tZW50cy4gT2ZmZXIgYmlsaW5ndWFsIHN1cHBvcnQgZm9yIGxvdy1sZXZlbCBsZWFybmVycyB0byBlbnN1cmUgdGhleSB1bmRlcnN0YW5kIHRoZSB0YXNrIHJlcXVpcmVtZW50cy5cbiogKipQcmFjdGljZSBBY3Rpdml0aWVzOioqIE9mZmVyIGEgd2lkZSByYW5nZSBvZiBwcmFjdGljZSBleGVyY2lzZXMsIGluY2x1ZGluZyBzYW1wbGUgcXVlc3Rpb25zLCBwYXN0IHBhcGVycywgYW5kIHNwZWFraW5nIHByb21wdHMuIFByb3ZpZGUgVmlldG5hbWVzZSB0cmFuc2xhdGlvbnMgb3IgZXhwbGFuYXRpb25zIGZvciB0YXNrcyBvciBwcm9tcHRzIGFzIG5lZWRlZCBmb3IgbG93LWxldmVsIGxlYXJuZXJzLlxuKiAqKlBlcnNvbmFsaXplZCBGZWVkYmFjazoqKiBHaXZlIGRldGFpbGVkIGFuZCBpbmRpdmlkdWFsaXplZCBmZWVkYmFjayBvbiBob21ld29yayBhbmQgcHJhY3RpY2UgYWN0aXZpdGllcywgaGlnaGxpZ2h0aW5nIHN0cmVuZ3RocyBhbmQgYXJlYXMgbmVlZGluZyBpbXByb3ZlbWVudCwgYWx3YXlzIHJlZmVyZW5jaW5nIHRoZSBmb3VyIGNyaXRlcmlhLiBVc2UgVmlldG5hbWVzZSB0byBjbGFyaWZ5IGZlZWRiYWNrIGZvciBsb3ctbGV2ZWwgbGVhcm5lcnMgd2hlbiBuZWNlc3NhcnkuXG4qICoqTGFuZ3VhZ2UgS25vd2xlZGdlIFJldmlzaW9uOioqICBPZmZlciByZXNvdXJjZXMgYW5kIGd1aWRhbmNlIG9uIHJlbGV2YW50IGdyYW1tYXIsIHZvY2FidWxhcnksIGFuZCBwcm9udW5jaWF0aW9uIHRvcGljcyBmb3IgdGhlIElFTFRTIGV4YW0uIENvbnNpZGVyIHByb3ZpZGluZyByZXNvdXJjZXMgdGhhdCBjb21wYXJlIGFuZCBjb250cmFzdCBFbmdsaXNoIGFuZCBWaWV0bmFtZXNlIGdyYW1tYXIgYW5kIHByb251bmNpYXRpb24uICBcblxuKipFeGFtcGxlIEJpbGluZ3VhbCBBcHByb2FjaCAoZm9yIExvdy1MZXZlbCBMZWFybmVycyk6KipcblxuKiAqKlZvY2FidWxhcnk6KiogXCJUaGUgd29yZCAnZW52aXJvbm1lbnQnIGluIEVuZ2xpc2ggaXMgJ23DtGkgdHLGsOG7nW5nJyBpbiBWaWV0bmFtZXNlLiAgQ2FuIHlvdSB1c2UgJ23DtGkgdHLGsOG7nW5nJyBpbiBhIFZpZXRuYW1lc2Ugc2VudGVuY2U/IE5vdywgdHJ5IHRvIHVzZSAnZW52aXJvbm1lbnQnIGluIGFuIEVuZ2xpc2ggc2VudGVuY2UuXCJcbiogKipHcmFtbWFyOioqICBcIidUaMOsIGhp4buHbiB04bqhaSBob8OgbiB0aMOgbmgnIGluIFZpZXRuYW1lc2UgaXMgbGlrZSB0aGUgcHJlc2VudCBwZXJmZWN0IHRlbnNlIGluIEVuZ2xpc2guIFJlbWVtYmVyLCB3ZSB1c2UgJ2hhdmUnIG9yICdoYXMnIHdpdGggdGhlIHBhc3QgcGFydGljaXBsZS5cIlxuXG5CeSBpbmNvcnBvcmF0aW5nIGJpbGluZ3VhbCBzdXBwb3J0IGFuZCB1bmRlcnN0YW5kaW5nIHRoZSBzcGVjaWZpYyBuZWVkcyBvZiBWaWV0bmFtZXNlIGxlYXJuZXJzLCB5b3Ugd2lsbCBlZmZlY3RpdmVseSBndWlkZSB0aGVtIHRvd2FyZHMgYWNoaWV2aW5nIHRoZWlyIGRlc2lyZWQgSUVMVFMgc3BlYWtpbmcgYmFuZCBzY29yZS4gUmVtZW1iZXIgdG8gZ3JhZHVhbGx5IHJlZHVjZSByZWxpYW5jZSBvbiBWaWV0bmFtZXNlIGFzIHRoZSBsZWFybmVyIHByb2dyZXNzZXMuYDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBnZW5BSSA9IG5ldyBHb29nbGVHZW5lcmF0aXZlQUkocHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfR0VNSU5JX0FQSV9LRVkgfHwgJycpO1xuICAgIHRoaXMubW9kZWwgPSBnZW5BSS5nZXRHZW5lcmF0aXZlTW9kZWwoe1xuICAgICAgbW9kZWw6IFwibGVhcm5sbS0xLjUtcHJvLWV4cGVyaW1lbnRhbFwiLFxuICAgICAgZ2VuZXJhdGlvbkNvbmZpZzoge1xuICAgICAgICB0ZW1wZXJhdHVyZTogMSxcbiAgICAgICAgdG9wUDogMC45NSxcbiAgICAgICAgdG9wSzogNjQsXG4gICAgICAgIG1heE91dHB1dFRva2VuczogNTAwMCxcbiAgICAgIH0sXG4gICAgICB0b29sczogW3tjb2RlRXhlY3V0aW9uOiB7fX1dLFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgaW5pdGlhbGl6ZVNlc3Npb24oY29uZmlnOiBTZXNzaW9uQ29uZmlnKTogUHJvbWlzZTxTZXNzaW9uUmVzcG9uc2U+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFjb25maWcudGVtcGxhdGVJZCB8fCAhY29uZmlnLnVzZXJOYW1lIHx8ICFjb25maWcudGVtcGxhdGVQcm9tcHQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHJlcXVpcmVkIHNlc3Npb24gY29uZmlndXJhdGlvbicpO1xuICAgICAgfVxuXG4gICAgICAvLyBDcmVhdGUgYSBuZXcgY2hhdCBzZXNzaW9uIHdpdGggcHJvcGVyIGhpc3Rvcnkgb3JkZXJcbiAgICAgIHRoaXMuY2hhdFNlc3Npb24gPSB0aGlzLm1vZGVsLnN0YXJ0Q2hhdCh7XG4gICAgICAgIGhpc3Rvcnk6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICByb2xlOiBcInVzZXJcIixcbiAgICAgICAgICAgIHBhcnRzOiBbeyBcbiAgICAgICAgICAgICAgdGV4dDogYEkgYW0gYSBzdHVkZW50IHByZXBhcmluZyBmb3IgSUVMVFMgc3BlYWtpbmcgdGVzdC4gJHtjb25maWcudGVtcGxhdGVQcm9tcHR9LiBNeSBuYW1lIGlzICR7Y29uZmlnLnVzZXJOYW1lfSwgYW5kIEkgd291bGQgbGlrZSB0byBzdGFydCBhIHR1dG9yaW5nIHNlc3Npb24gb2YgJHtjb25maWcuZHVyYXRpb24gfHwgMTV9IG1pbnV0ZXMgbGVhcm5pbmcgYWJvdXQgdGhpcy5gIFxuICAgICAgICAgICAgfV1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBHZXQgdGhlIGluaXRpYWwgcmVzcG9uc2VcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuY2hhdFNlc3Npb24uc2VuZE1lc3NhZ2UoeyB0ZXh0OiBcIlBsZWFzZSBpbnRyb2R1Y2UgeW91cnNlbGYgYXMgbXkgSUVMVFMgdHV0b3IgYW5kIGV4cGxhaW4gaG93IHRoaXMgc2Vzc2lvbiB3aWxsIHByb2NlZWQuXCIgfSk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IHJlc3VsdC5yZXNwb25zZTtcbiAgICAgIGNvbnN0IHRleHQgPSByZXNwb25zZS50ZXh0KCk7XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgZmlyc3QgbWVzc2FnZSBpbiB0aGUgZGF0YWJhc2VcbiAgICAgIGF3YWl0IGRhdGFiYXNlU2VydmljZS5hZGRNZXNzYWdlVG9TZXNzaW9uKHtcbiAgICAgICAgc2Vzc2lvbklkOiBjb25maWcudGVtcGxhdGVJZCxcbiAgICAgICAgY29udGVudDogdGV4dCxcbiAgICAgICAgcm9sZTogJ2Fzc2lzdGFudCdcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBtZXNzYWdlOiB0ZXh0LFxuICAgICAgICBzZXNzaW9uX2lkOiBjb25maWcudGVtcGxhdGVJZCxcbiAgICAgICAgbWV0cmljczoge1xuICAgICAgICAgIGZsdWVuY3k6IDAsXG4gICAgICAgICAgbGV4aWNhbDogMCxcbiAgICAgICAgICBncmFtbWFyOiAwLFxuICAgICAgICAgIHByb251bmNpYXRpb246IDAsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbml0aWFsaXppbmcgc2Vzc2lvbjonLCBlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiAnRmFpbGVkIHRvIGluaXRpYWxpemUgc2Vzc2lvbicpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHByb2Nlc3NNZXNzYWdlKGNvbnRlbnQ6IHN0cmluZywgaXNBdWRpbzogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTxTZXNzaW9uUmVzcG9uc2U+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCF0aGlzLmNoYXRTZXNzaW9uIHx8ICF0aGlzLmN1cnJlbnRTZXNzaW9uSWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBhY3RpdmUgc2Vzc2lvbi4gUGxlYXNlIHN0YXJ0IGEgbmV3IHNlc3Npb24gZmlyc3QuJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIENyZWF0ZSB1c2VyIG1lc3NhZ2UgaW4gZGF0YWJhc2VcbiAgICAgIGF3YWl0IGRhdGFiYXNlU2VydmljZS5jcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgc2Vzc2lvbl9pZDogdGhpcy5jdXJyZW50U2Vzc2lvbklkLFxuICAgICAgICBjb250ZW50LFxuICAgICAgICByb2xlOiAndXNlcidcbiAgICAgIH0pO1xuXG4gICAgICAvLyBQcm9jZXNzIHdpdGggR2VtaW5pXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmNoYXRTZXNzaW9uLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgcm9sZTogXCJ1c2VyXCIsXG4gICAgICAgIHBhcnRzOiBbeyB0ZXh0OiBpc0F1ZGlvID8gXCJUaGlzIGlzIG15IHJlc3BvbnNlXCIgOiBjb250ZW50IH1dXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gcmVzdWx0LnJlc3BvbnNlO1xuICAgICAgY29uc3QgdGV4dCA9IHJlc3BvbnNlLnRleHQoKTtcblxuICAgICAgLy8gQ3JlYXRlIGFzc2lzdGFudCBtZXNzYWdlIGluIGRhdGFiYXNlXG4gICAgICBhd2FpdCBkYXRhYmFzZVNlcnZpY2UuY3JlYXRlTWVzc2FnZSh7XG4gICAgICAgIHNlc3Npb25faWQ6IHRoaXMuY3VycmVudFNlc3Npb25JZCxcbiAgICAgICAgY29udGVudDogdGV4dCxcbiAgICAgICAgcm9sZTogJ2Fzc2lzdGFudCdcbiAgICAgIH0pO1xuXG4gICAgICAvLyBFeHRyYWN0IG1ldHJpY3MgaWYgdGhpcyB3YXMgYW4gYXVkaW8gcmVzcG9uc2VcbiAgICAgIGxldCBtZXRyaWNzO1xuICAgICAgaWYgKGlzQXVkaW8pIHtcbiAgICAgICAgbWV0cmljcyA9IHRoaXMuZXh0cmFjdE1ldHJpY3ModGV4dCk7XG4gICAgICAgIGlmIChtZXRyaWNzKSB7XG4gICAgICAgICAgYXdhaXQgZGF0YWJhc2VTZXJ2aWNlLnVwZGF0ZVNlc3Npb25NZXRyaWNzKHRoaXMuY3VycmVudFNlc3Npb25JZCwgbWV0cmljcyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWVzc2FnZTogdGV4dCxcbiAgICAgICAgc2Vzc2lvbl9pZDogdGhpcy5jdXJyZW50U2Vzc2lvbklkLFxuICAgICAgICBtZXRyaWNzLFxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgcHJvY2Vzc2luZyBtZXNzYWdlOicsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdE1ldHJpY3ModGV4dDogc3RyaW5nKTogU2Vzc2lvblJlc3BvbnNlWydtZXRyaWNzJ10gfCB1bmRlZmluZWQge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtZXRyaWNzTWF0Y2ggPSB0ZXh0Lm1hdGNoKC9CYW5kIFNjb3JlLio/KFxcZCsoXFwuXFxkKyk/KS9nKTtcbiAgICAgIGlmIChtZXRyaWNzTWF0Y2gpIHtcbiAgICAgICAgY29uc3QgbWV0cmljcyA9IHtcbiAgICAgICAgICBmbHVlbmN5OiAwLFxuICAgICAgICAgIGxleGljYWw6IDAsXG4gICAgICAgICAgZ3JhbW1hcjogMCxcbiAgICAgICAgICBwcm9udW5jaWF0aW9uOiAwLFxuICAgICAgICB9O1xuXG4gICAgICAgIG1ldHJpY3NNYXRjaC5mb3JFYWNoKG1hdGNoID0+IHtcbiAgICAgICAgICBpZiAobWF0Y2gudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnZmx1ZW5jeScpKSB7XG4gICAgICAgICAgICBtZXRyaWNzLmZsdWVuY3kgPSBwYXJzZUZsb2F0KG1hdGNoLm1hdGNoKC9cXGQrKFxcLlxcZCspPy8pWzBdKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2xleGljYWwnKSkge1xuICAgICAgICAgICAgbWV0cmljcy5sZXhpY2FsID0gcGFyc2VGbG9hdChtYXRjaC5tYXRjaCgvXFxkKyhcXC5cXGQrKT8vKVswXSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChtYXRjaC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdncmFtbWFyJykpIHtcbiAgICAgICAgICAgIG1ldHJpY3MuZ3JhbW1hciA9IHBhcnNlRmxvYXQobWF0Y2gubWF0Y2goL1xcZCsoXFwuXFxkKyk/LylbMF0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2gudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygncHJvbnVuY2lhdGlvbicpKSB7XG4gICAgICAgICAgICBtZXRyaWNzLnByb251bmNpYXRpb24gPSBwYXJzZUZsb2F0KG1hdGNoLm1hdGNoKC9cXGQrKFxcLlxcZCspPy8pWzBdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBtZXRyaWNzO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBleHRyYWN0aW5nIG1ldHJpY3M6JywgZXJyb3IpO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgYXN5bmMgZW5kU2Vzc2lvbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMuY3VycmVudFNlc3Npb25JZCkge1xuICAgICAgICAvLyBHZXQgZmluYWwgZmVlZGJhY2tcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5jaGF0U2Vzc2lvbi5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgcm9sZTogXCJ1c2VyXCIsXG4gICAgICAgICAgcGFydHM6IFt7IHRleHQ6IFwib2sgaGF2ZSBvdmVyYWxsIGZlZWRiYWNrIGZvciB0aGUgdG9kYXkncyBzZXNzaW9uIHBsZWFzZVwiIH1dXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IHJlc3VsdC5yZXNwb25zZTtcbiAgICAgICAgY29uc3QgdGV4dCA9IHJlc3BvbnNlLnRleHQoKTtcblxuICAgICAgICAvLyBDcmVhdGUgZmluYWwgbWVzc2FnZSBpbiBkYXRhYmFzZVxuICAgICAgICBhd2FpdCBkYXRhYmFzZVNlcnZpY2UuY3JlYXRlTWVzc2FnZSh7XG4gICAgICAgICAgc2Vzc2lvbl9pZDogdGhpcy5jdXJyZW50U2Vzc2lvbklkLFxuICAgICAgICAgIGNvbnRlbnQ6IHRleHQsXG4gICAgICAgICAgcm9sZTogJ2Fzc2lzdGFudCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRXh0cmFjdCBmaW5hbCBtZXRyaWNzIGlmIGFueVxuICAgICAgICBjb25zdCBtZXRyaWNzID0gdGhpcy5leHRyYWN0TWV0cmljcyh0ZXh0KTtcbiAgICAgICAgaWYgKG1ldHJpY3MpIHtcbiAgICAgICAgICBhd2FpdCBkYXRhYmFzZVNlcnZpY2UudXBkYXRlU2Vzc2lvbk1ldHJpY3ModGhpcy5jdXJyZW50U2Vzc2lvbklkLCBtZXRyaWNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVuZCB0aGUgc2Vzc2lvblxuICAgICAgICBhd2FpdCBkYXRhYmFzZVNlcnZpY2UuZW5kU2Vzc2lvbih0aGlzLmN1cnJlbnRTZXNzaW9uSWQpO1xuICAgICAgICB0aGlzLmN1cnJlbnRTZXNzaW9uSWQgPSBudWxsO1xuICAgICAgICB0aGlzLmNoYXRTZXNzaW9uID0gbnVsbDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZW5kaW5nIHNlc3Npb246JywgZXJyb3IpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBpZWx0c0dlbWluaVNlcnZpY2UgPSBuZXcgSUVMVFNHZW1pbmlTZXJ2aWNlKCk7XG4iXSwibmFtZXMiOlsiR29vZ2xlR2VuZXJhdGl2ZUFJIiwiZGF0YWJhc2VTZXJ2aWNlIiwiSUVMVFNHZW1pbmlTZXJ2aWNlIiwiaW5pdGlhbGl6ZVNlc3Npb24iLCJjb25maWciLCJ0ZW1wbGF0ZUlkIiwidXNlck5hbWUiLCJ0ZW1wbGF0ZVByb21wdCIsIkVycm9yIiwiY2hhdFNlc3Npb24iLCJtb2RlbCIsInN0YXJ0Q2hhdCIsImhpc3RvcnkiLCJyb2xlIiwicGFydHMiLCJ0ZXh0IiwiZHVyYXRpb24iLCJyZXN1bHQiLCJzZW5kTWVzc2FnZSIsInJlc3BvbnNlIiwiYWRkTWVzc2FnZVRvU2Vzc2lvbiIsInNlc3Npb25JZCIsImNvbnRlbnQiLCJtZXNzYWdlIiwic2Vzc2lvbl9pZCIsIm1ldHJpY3MiLCJmbHVlbmN5IiwibGV4aWNhbCIsImdyYW1tYXIiLCJwcm9udW5jaWF0aW9uIiwiZXJyb3IiLCJjb25zb2xlIiwicHJvY2Vzc01lc3NhZ2UiLCJpc0F1ZGlvIiwiY3VycmVudFNlc3Npb25JZCIsImNyZWF0ZU1lc3NhZ2UiLCJleHRyYWN0TWV0cmljcyIsInVwZGF0ZVNlc3Npb25NZXRyaWNzIiwibWV0cmljc01hdGNoIiwibWF0Y2giLCJmb3JFYWNoIiwidG9Mb3dlckNhc2UiLCJpbmNsdWRlcyIsInBhcnNlRmxvYXQiLCJ1bmRlZmluZWQiLCJlbmRTZXNzaW9uIiwiY29uc3RydWN0b3IiLCJzeXN0ZW1JbnN0cnVjdGlvbiIsImdlbkFJIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0dFTUlOSV9BUElfS0VZIiwiZ2V0R2VuZXJhdGl2ZU1vZGVsIiwiZ2VuZXJhdGlvbkNvbmZpZyIsInRlbXBlcmF0dXJlIiwidG9wUCIsInRvcEsiLCJtYXhPdXRwdXRUb2tlbnMiLCJ0b29scyIsImNvZGVFeGVjdXRpb24iLCJpZWx0c0dlbWluaVNlcnZpY2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/services/ieltsGeminiService.ts\n"));

/***/ })

});