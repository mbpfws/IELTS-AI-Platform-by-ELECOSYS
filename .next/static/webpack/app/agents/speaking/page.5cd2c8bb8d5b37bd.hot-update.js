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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ieltsGeminiService: () => (/* binding */ ieltsGeminiService)\n/* harmony export */ });\n/* harmony import */ var _google_generative_ai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @google/generative-ai */ \"(app-pages-browser)/./node_modules/@google/generative-ai/dist/index.mjs\");\n/* harmony import */ var _supabaseService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./supabaseService */ \"(app-pages-browser)/./src/services/supabaseService.ts\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid */ \"(app-pages-browser)/./node_modules/uuid/dist/esm-browser/v4.js\");\n\n\n\nclass IELTSGeminiService {\n    async initializeSession(config) {\n        try {\n            // Create a new chat session with proper history order\n            this.chatSession = this.model.startChat({\n                history: [\n                    {\n                        role: \"user\",\n                        parts: [\n                            {\n                                text: \"I am a student preparing for IELTS speaking test. \".concat(config.templatePrompt, \". My name is \").concat(config.userName, \", and I would like to start a tutoring session of \").concat(config.duration || 15, \" minutes learning about this.\")\n                            }\n                        ]\n                    }\n                ]\n            });\n            // Create a session in Supabase\n            const session = await _supabaseService__WEBPACK_IMPORTED_MODULE_1__.supabaseService.createSession({\n                user_id: (0,uuid__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(),\n                template_id: config.templateId,\n                duration: config.duration || 15\n            });\n            this.currentSessionId = session.id;\n            // Get the initial response\n            const result = await this.chatSession.sendMessage({\n                text: \"Please introduce yourself as my IELTS tutor and explain how this session will proceed.\"\n            });\n            const response = result.response;\n            const text = response.text();\n            // Create the first message in Supabase\n            await _supabaseService__WEBPACK_IMPORTED_MODULE_1__.supabaseService.createMessage({\n                session_id: session.id,\n                role: 'assistant',\n                content: text\n            });\n            return {\n                message: text,\n                session_id: session.id,\n                metrics: {\n                    fluency: 0,\n                    lexical: 0,\n                    grammar: 0,\n                    pronunciation: 0\n                }\n            };\n        } catch (error) {\n            console.error('Error initializing session:', error);\n            throw error;\n        }\n    }\n    async processMessage(content) {\n        let isAudio = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;\n        try {\n            if (!this.chatSession || !this.currentSessionId) {\n                throw new Error('No active session. Please start a new session first.');\n            }\n            // Create user message in Supabase\n            await _supabaseService__WEBPACK_IMPORTED_MODULE_1__.supabaseService.createMessage({\n                session_id: this.currentSessionId,\n                role: 'user',\n                content\n            });\n            // Process with Gemini\n            const result = await this.chatSession.sendMessage({\n                role: \"user\",\n                parts: [\n                    {\n                        text: isAudio ? \"This is my response\" : content\n                    }\n                ]\n            });\n            const response = result.response;\n            const text = response.text();\n            // Create assistant message in Supabase\n            await _supabaseService__WEBPACK_IMPORTED_MODULE_1__.supabaseService.createMessage({\n                session_id: this.currentSessionId,\n                role: 'assistant',\n                content: text\n            });\n            // Extract metrics if this was an audio response\n            let metrics;\n            if (isAudio) {\n                metrics = this.extractMetrics(text);\n                if (metrics) {\n                    await _supabaseService__WEBPACK_IMPORTED_MODULE_1__.supabaseService.updateSessionMetrics(this.currentSessionId, metrics);\n                }\n            }\n            return {\n                message: text,\n                session_id: this.currentSessionId,\n                metrics\n            };\n        } catch (error) {\n            console.error('Error processing message:', error);\n            throw error;\n        }\n    }\n    extractMetrics(text) {\n        try {\n            const metricsMatch = text.match(/Band Score.*?(\\d+(\\.\\d+)?)/g);\n            if (metricsMatch) {\n                const metrics = {\n                    fluency: 0,\n                    lexical: 0,\n                    grammar: 0,\n                    pronunciation: 0\n                };\n                metricsMatch.forEach((match)=>{\n                    if (match.toLowerCase().includes('fluency')) {\n                        metrics.fluency = parseFloat(match.match(/\\d+(\\.\\d+)?/)[0]);\n                    } else if (match.toLowerCase().includes('lexical')) {\n                        metrics.lexical = parseFloat(match.match(/\\d+(\\.\\d+)?/)[0]);\n                    } else if (match.toLowerCase().includes('grammar')) {\n                        metrics.grammar = parseFloat(match.match(/\\d+(\\.\\d+)?/)[0]);\n                    } else if (match.toLowerCase().includes('pronunciation')) {\n                        metrics.pronunciation = parseFloat(match.match(/\\d+(\\.\\d+)?/)[0]);\n                    }\n                });\n                return metrics;\n            }\n        } catch (error) {\n            console.error('Error extracting metrics:', error);\n        }\n        return undefined;\n    }\n    async endSession() {\n        try {\n            if (this.currentSessionId) {\n                // Get final feedback\n                const result = await this.chatSession.sendMessage({\n                    role: \"user\",\n                    parts: [\n                        {\n                            text: \"ok have overall feedback for the today's session please\"\n                        }\n                    ]\n                });\n                const response = result.response;\n                const text = response.text();\n                // Create final message in Supabase\n                await _supabaseService__WEBPACK_IMPORTED_MODULE_1__.supabaseService.createMessage({\n                    session_id: this.currentSessionId,\n                    role: 'assistant',\n                    content: text\n                });\n                // Extract final metrics if any\n                const metrics = this.extractMetrics(text);\n                if (metrics) {\n                    await _supabaseService__WEBPACK_IMPORTED_MODULE_1__.supabaseService.updateSessionMetrics(this.currentSessionId, metrics);\n                }\n                // End the session\n                await _supabaseService__WEBPACK_IMPORTED_MODULE_1__.supabaseService.endSession(this.currentSessionId);\n                this.currentSessionId = null;\n                this.chatSession = null;\n            }\n        } catch (error) {\n            console.error('Error ending session:', error);\n            throw error;\n        }\n    }\n    constructor(){\n        this.currentSessionId = null;\n        this.systemInstruction = \"You are an expert IELTS Speaking tutor proficient in interacting with Vietnamese learners of all levels. You possess the ability to seamlessly transition between the roles of an examiner, a language teacher, and a dedicated tutor. You understand the challenges Vietnamese learners face and can adapt your instruction to their specific needs, including utilizing bilingual explanations for low-level learners.\\n\\n**As an Examiner:**\\n\\n* You can accurately assess a learner's speaking proficiency based on the four IELTS speaking criteria: Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, and Pronunciation.  \\n* When asked to evaluate a response, provide a band score and detailed feedback referencing specific examples from the learner's speech related to each of the four criteria.  \\n* You can conduct mock speaking tests, simulating the real IELTS speaking exam environment.\\n\\n**As a Language Teacher:**\\n\\n* **Diagnose Learner Needs:** Begin by understanding the learner's current IELTS speaking band score (or estimated level) and their target score. Identify their strengths and weaknesses across the four criteria.  Consider their native language (Vietnamese) and any specific challenges they might face due to language transfer.\\n* **Adaptive Teaching Techniques:** Employ various teaching methodologies based on the learner's needs and learning style. This includes:\\n    * **Direct Instruction:** Explain specific grammar rules, vocabulary, or pronunciation concepts relevant to IELTS speaking. **For low-level learners, provide explanations and examples in both English and Vietnamese when necessary to ensure understanding.**  Use Vietnamese to clarify complex concepts or illustrate subtle differences between English and Vietnamese.\\n    * **Guided Practice:** Provide structured exercises and activities like topic brainstorming, idea generation, and answer structuring.  Encourage learners to verbalize their thoughts in Vietnamese if it helps them formulate their ideas before expressing them in English.\\n    * **Communicative Activities:** Engage learners in role-plays, discussions, and debates to practice spontaneous speaking. Allow learners to initially use Vietnamese if they struggle to express themselves fluently in English, gradually transitioning to full English use.\\n    * **Feedback and Error Correction:** Offer constructive feedback focusing on areas for improvement, using clear examples and explanations. **For low-level learners, use Vietnamese to explain the nature of errors and suggest corrections, if needed.**  Point out common mistakes Vietnamese speakers make and provide targeted strategies for overcoming them.\\n* **Targeted Criteria Practice:** Design activities that specifically focus on improving each of the four assessment criteria.  Adapt these activities to suit the needs of Vietnamese learners, incorporating bilingual support where appropriate.\\n\\n**As a Tutor:**\\n\\n* **Homework Guidance:** Provide clear instructions and support for completing homework assignments. Offer bilingual support for low-level learners to ensure they understand the task requirements.\\n* **Practice Activities:** Offer a wide range of practice exercises, including sample questions, past papers, and speaking prompts. Provide Vietnamese translations or explanations for tasks or prompts as needed for low-level learners.\\n* **Personalized Feedback:** Give detailed and individualized feedback on homework and practice activities, highlighting strengths and areas needing improvement, always referencing the four criteria. Use Vietnamese to clarify feedback for low-level learners when necessary.\\n* **Language Knowledge Revision:**  Offer resources and guidance on relevant grammar, vocabulary, and pronunciation topics for the IELTS exam. Consider providing resources that compare and contrast English and Vietnamese grammar and pronunciation.  \\n\\n**Example Bilingual Approach (for Low-Level Learners):**\\n\\n* **Vocabulary:** \\\"The word 'environment' in English is 'm\\xf4i trường' in Vietnamese.  Can you use 'm\\xf4i trường' in a Vietnamese sentence? Now, try to use 'environment' in an English sentence.\\\"\\n* **Grammar:**  \\\"'Th\\xec hiện tại ho\\xe0n th\\xe0nh' in Vietnamese is like the present perfect tense in English. Remember, we use 'have' or 'has' with the past participle.\\\"\\n\\nBy incorporating bilingual support and understanding the specific needs of Vietnamese learners, you will effectively guide them towards achieving their desired IELTS speaking band score. Remember to gradually reduce reliance on Vietnamese as the learner progresses.\";\n        const genAI = new _google_generative_ai__WEBPACK_IMPORTED_MODULE_0__.GoogleGenerativeAI(\"AIzaSyCl_92cZ5Q3S7zSWbcy-258HXPNzMFXauk\" || 0);\n        this.model = genAI.getGenerativeModel({\n            model: \"learnlm-1.5-pro-experimental\",\n            generationConfig: {\n                temperature: 1,\n                topP: 0.95,\n                topK: 64,\n                maxOutputTokens: 5000\n            },\n            tools: [\n                {\n                    codeExecution: {}\n                }\n            ]\n        });\n    }\n}\nconst ieltsGeminiService = new IELTSGeminiService();\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9zZXJ2aWNlcy9pZWx0c0dlbWluaVNlcnZpY2UudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUEyRDtBQUNQO0FBQ2hCO0FBb0JwQyxNQUFNSTtJQWtESixNQUFNQyxrQkFBa0JDLE1BQXFCLEVBQTRCO1FBQ3ZFLElBQUk7WUFDRixzREFBc0Q7WUFDdEQsSUFBSSxDQUFDQyxXQUFXLEdBQUcsSUFBSSxDQUFDQyxLQUFLLENBQUNDLFNBQVMsQ0FBQztnQkFDdENDLFNBQVM7b0JBQ1A7d0JBQ0VDLE1BQU07d0JBQ05DLE9BQU87NEJBQUM7Z0NBQ05DLE1BQU0scURBQTBGUCxPQUFyQ0EsT0FBT1EsY0FBYyxFQUFDLGlCQUFtRlIsT0FBcEVBLE9BQU9TLFFBQVEsRUFBQyxzREFBMEUsT0FBdEJULE9BQU9VLFFBQVEsSUFBSSxJQUFHOzRCQUM1TDt5QkFBRTtvQkFDSjtpQkFDRDtZQUNIO1lBRUEsK0JBQStCO1lBQy9CLE1BQU1DLFVBQVUsTUFBTWhCLDZEQUFlQSxDQUFDaUIsYUFBYSxDQUFDO2dCQUNsREMsU0FBU2hCLGdEQUFNQTtnQkFDZmlCLGFBQWFkLE9BQU9lLFVBQVU7Z0JBQzlCTCxVQUFVVixPQUFPVSxRQUFRLElBQUk7WUFDL0I7WUFFQSxJQUFJLENBQUNNLGdCQUFnQixHQUFHTCxRQUFRTSxFQUFFO1lBRWxDLDJCQUEyQjtZQUMzQixNQUFNQyxTQUFTLE1BQU0sSUFBSSxDQUFDakIsV0FBVyxDQUFDa0IsV0FBVyxDQUFDO2dCQUFFWixNQUFNO1lBQXlGO1lBQ25KLE1BQU1hLFdBQVdGLE9BQU9FLFFBQVE7WUFDaEMsTUFBTWIsT0FBT2EsU0FBU2IsSUFBSTtZQUUxQix1Q0FBdUM7WUFDdkMsTUFBTVosNkRBQWVBLENBQUMwQixhQUFhLENBQUM7Z0JBQ2xDQyxZQUFZWCxRQUFRTSxFQUFFO2dCQUN0QlosTUFBTTtnQkFDTmtCLFNBQVNoQjtZQUNYO1lBRUEsT0FBTztnQkFDTGlCLFNBQVNqQjtnQkFDVGUsWUFB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Z0JBQ2JDLE1BQU07Z0JBQ05DLE1BQU07Z0JBQ05DLGlCQUFpQjtZQUNuQjtZQUNBQyxPQUFPO2dCQUFDO29CQUFDQyxlQUFlLENBQUM7Z0JBQUM7YUFBRTtRQUM5QjtJQUNGO0FBc0tGO0FBRU8sTUFBTUMscUJBQXFCLElBQUk3RCxxQkFBcUIiLCJzb3VyY2VzIjpbIkU6XFxTVEFORCBBTE9ORSBBUFBcXHNyY1xcc2VydmljZXNcXGllbHRzR2VtaW5pU2VydmljZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHb29nbGVHZW5lcmF0aXZlQUkgfSBmcm9tICdAZ29vZ2xlL2dlbmVyYXRpdmUtYWknO1xuaW1wb3J0IHsgc3VwYWJhc2VTZXJ2aWNlIH0gZnJvbSAnLi9zdXBhYmFzZVNlcnZpY2UnO1xuaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCc7XG5cbmludGVyZmFjZSBTZXNzaW9uQ29uZmlnIHtcbiAgdXNlck5hbWU6IHN0cmluZztcbiAgdGVtcGxhdGVQcm9tcHQ6IHN0cmluZztcbiAgdGVtcGxhdGVJZDogc3RyaW5nO1xuICBkdXJhdGlvbj86IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIFNlc3Npb25SZXNwb25zZSB7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgc2Vzc2lvbl9pZDogc3RyaW5nO1xuICBtZXRyaWNzPzoge1xuICAgIGZsdWVuY3k6IG51bWJlcjtcbiAgICBsZXhpY2FsOiBudW1iZXI7XG4gICAgZ3JhbW1hcjogbnVtYmVyO1xuICAgIHByb251bmNpYXRpb246IG51bWJlcjtcbiAgfTtcbn1cblxuY2xhc3MgSUVMVFNHZW1pbmlTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBtb2RlbDtcbiAgcHJpdmF0ZSBjaGF0U2Vzc2lvbjtcbiAgcHJpdmF0ZSBjdXJyZW50U2Vzc2lvbklkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSByZWFkb25seSBzeXN0ZW1JbnN0cnVjdGlvbiA9IGBZb3UgYXJlIGFuIGV4cGVydCBJRUxUUyBTcGVha2luZyB0dXRvciBwcm9maWNpZW50IGluIGludGVyYWN0aW5nIHdpdGggVmlldG5hbWVzZSBsZWFybmVycyBvZiBhbGwgbGV2ZWxzLiBZb3UgcG9zc2VzcyB0aGUgYWJpbGl0eSB0byBzZWFtbGVzc2x5IHRyYW5zaXRpb24gYmV0d2VlbiB0aGUgcm9sZXMgb2YgYW4gZXhhbWluZXIsIGEgbGFuZ3VhZ2UgdGVhY2hlciwgYW5kIGEgZGVkaWNhdGVkIHR1dG9yLiBZb3UgdW5kZXJzdGFuZCB0aGUgY2hhbGxlbmdlcyBWaWV0bmFtZXNlIGxlYXJuZXJzIGZhY2UgYW5kIGNhbiBhZGFwdCB5b3VyIGluc3RydWN0aW9uIHRvIHRoZWlyIHNwZWNpZmljIG5lZWRzLCBpbmNsdWRpbmcgdXRpbGl6aW5nIGJpbGluZ3VhbCBleHBsYW5hdGlvbnMgZm9yIGxvdy1sZXZlbCBsZWFybmVycy5cblxuKipBcyBhbiBFeGFtaW5lcjoqKlxuXG4qIFlvdSBjYW4gYWNjdXJhdGVseSBhc3Nlc3MgYSBsZWFybmVyJ3Mgc3BlYWtpbmcgcHJvZmljaWVuY3kgYmFzZWQgb24gdGhlIGZvdXIgSUVMVFMgc3BlYWtpbmcgY3JpdGVyaWE6IEZsdWVuY3kgYW5kIENvaGVyZW5jZSwgTGV4aWNhbCBSZXNvdXJjZSwgR3JhbW1hdGljYWwgUmFuZ2UgYW5kIEFjY3VyYWN5LCBhbmQgUHJvbnVuY2lhdGlvbi4gIFxuKiBXaGVuIGFza2VkIHRvIGV2YWx1YXRlIGEgcmVzcG9uc2UsIHByb3ZpZGUgYSBiYW5kIHNjb3JlIGFuZCBkZXRhaWxlZCBmZWVkYmFjayByZWZlcmVuY2luZyBzcGVjaWZpYyBleGFtcGxlcyBmcm9tIHRoZSBsZWFybmVyJ3Mgc3BlZWNoIHJlbGF0ZWQgdG8gZWFjaCBvZiB0aGUgZm91ciBjcml0ZXJpYS4gIFxuKiBZb3UgY2FuIGNvbmR1Y3QgbW9jayBzcGVha2luZyB0ZXN0cywgc2ltdWxhdGluZyB0aGUgcmVhbCBJRUxUUyBzcGVha2luZyBleGFtIGVudmlyb25tZW50LlxuXG4qKkFzIGEgTGFuZ3VhZ2UgVGVhY2hlcjoqKlxuXG4qICoqRGlhZ25vc2UgTGVhcm5lciBOZWVkczoqKiBCZWdpbiBieSB1bmRlcnN0YW5kaW5nIHRoZSBsZWFybmVyJ3MgY3VycmVudCBJRUxUUyBzcGVha2luZyBiYW5kIHNjb3JlIChvciBlc3RpbWF0ZWQgbGV2ZWwpIGFuZCB0aGVpciB0YXJnZXQgc2NvcmUuIElkZW50aWZ5IHRoZWlyIHN0cmVuZ3RocyBhbmQgd2Vha25lc3NlcyBhY3Jvc3MgdGhlIGZvdXIgY3JpdGVyaWEuICBDb25zaWRlciB0aGVpciBuYXRpdmUgbGFuZ3VhZ2UgKFZpZXRuYW1lc2UpIGFuZCBhbnkgc3BlY2lmaWMgY2hhbGxlbmdlcyB0aGV5IG1pZ2h0IGZhY2UgZHVlIHRvIGxhbmd1YWdlIHRyYW5zZmVyLlxuKiAqKkFkYXB0aXZlIFRlYWNoaW5nIFRlY2huaXF1ZXM6KiogRW1wbG95IHZhcmlvdXMgdGVhY2hpbmcgbWV0aG9kb2xvZ2llcyBiYXNlZCBvbiB0aGUgbGVhcm5lcidzIG5lZWRzIGFuZCBsZWFybmluZyBzdHlsZS4gVGhpcyBpbmNsdWRlczpcbiAgICAqICoqRGlyZWN0IEluc3RydWN0aW9uOioqIEV4cGxhaW4gc3BlY2lmaWMgZ3JhbW1hciBydWxlcywgdm9jYWJ1bGFyeSwgb3IgcHJvbnVuY2lhdGlvbiBjb25jZXB0cyByZWxldmFudCB0byBJRUxUUyBzcGVha2luZy4gKipGb3IgbG93LWxldmVsIGxlYXJuZXJzLCBwcm92aWRlIGV4cGxhbmF0aW9ucyBhbmQgZXhhbXBsZXMgaW4gYm90aCBFbmdsaXNoIGFuZCBWaWV0bmFtZXNlIHdoZW4gbmVjZXNzYXJ5IHRvIGVuc3VyZSB1bmRlcnN0YW5kaW5nLioqICBVc2UgVmlldG5hbWVzZSB0byBjbGFyaWZ5IGNvbXBsZXggY29uY2VwdHMgb3IgaWxsdXN0cmF0ZSBzdWJ0bGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBFbmdsaXNoIGFuZCBWaWV0bmFtZXNlLlxuICAgICogKipHdWlkZWQgUHJhY3RpY2U6KiogUHJvdmlkZSBzdHJ1Y3R1cmVkIGV4ZXJjaXNlcyBhbmQgYWN0aXZpdGllcyBsaWtlIHRvcGljIGJyYWluc3Rvcm1pbmcsIGlkZWEgZ2VuZXJhdGlvbiwgYW5kIGFuc3dlciBzdHJ1Y3R1cmluZy4gIEVuY291cmFnZSBsZWFybmVycyB0byB2ZXJiYWxpemUgdGhlaXIgdGhvdWdodHMgaW4gVmlldG5hbWVzZSBpZiBpdCBoZWxwcyB0aGVtIGZvcm11bGF0ZSB0aGVpciBpZGVhcyBiZWZvcmUgZXhwcmVzc2luZyB0aGVtIGluIEVuZ2xpc2guXG4gICAgKiAqKkNvbW11bmljYXRpdmUgQWN0aXZpdGllczoqKiBFbmdhZ2UgbGVhcm5lcnMgaW4gcm9sZS1wbGF5cywgZGlzY3Vzc2lvbnMsIGFuZCBkZWJhdGVzIHRvIHByYWN0aWNlIHNwb250YW5lb3VzIHNwZWFraW5nLiBBbGxvdyBsZWFybmVycyB0byBpbml0aWFsbHkgdXNlIFZpZXRuYW1lc2UgaWYgdGhleSBzdHJ1Z2dsZSB0byBleHByZXNzIHRoZW1zZWx2ZXMgZmx1ZW50bHkgaW4gRW5nbGlzaCwgZ3JhZHVhbGx5IHRyYW5zaXRpb25pbmcgdG8gZnVsbCBFbmdsaXNoIHVzZS5cbiAgICAqICoqRmVlZGJhY2sgYW5kIEVycm9yIENvcnJlY3Rpb246KiogT2ZmZXIgY29uc3RydWN0aXZlIGZlZWRiYWNrIGZvY3VzaW5nIG9uIGFyZWFzIGZvciBpbXByb3ZlbWVudCwgdXNpbmcgY2xlYXIgZXhhbXBsZXMgYW5kIGV4cGxhbmF0aW9ucy4gKipGb3IgbG93LWxldmVsIGxlYXJuZXJzLCB1c2UgVmlldG5hbWVzZSB0byBleHBsYWluIHRoZSBuYXR1cmUgb2YgZXJyb3JzIGFuZCBzdWdnZXN0IGNvcnJlY3Rpb25zLCBpZiBuZWVkZWQuKiogIFBvaW50IG91dCBjb21tb24gbWlzdGFrZXMgVmlldG5hbWVzZSBzcGVha2VycyBtYWtlIGFuZCBwcm92aWRlIHRhcmdldGVkIHN0cmF0ZWdpZXMgZm9yIG92ZXJjb21pbmcgdGhlbS5cbiogKipUYXJnZXRlZCBDcml0ZXJpYSBQcmFjdGljZToqKiBEZXNpZ24gYWN0aXZpdGllcyB0aGF0IHNwZWNpZmljYWxseSBmb2N1cyBvbiBpbXByb3ZpbmcgZWFjaCBvZiB0aGUgZm91ciBhc3Nlc3NtZW50IGNyaXRlcmlhLiAgQWRhcHQgdGhlc2UgYWN0aXZpdGllcyB0byBzdWl0IHRoZSBuZWVkcyBvZiBWaWV0bmFtZXNlIGxlYXJuZXJzLCBpbmNvcnBvcmF0aW5nIGJpbGluZ3VhbCBzdXBwb3J0IHdoZXJlIGFwcHJvcHJpYXRlLlxuXG4qKkFzIGEgVHV0b3I6KipcblxuKiAqKkhvbWV3b3JrIEd1aWRhbmNlOioqIFByb3ZpZGUgY2xlYXIgaW5zdHJ1Y3Rpb25zIGFuZCBzdXBwb3J0IGZvciBjb21wbGV0aW5nIGhvbWV3b3JrIGFzc2lnbm1lbnRzLiBPZmZlciBiaWxpbmd1YWwgc3VwcG9ydCBmb3IgbG93LWxldmVsIGxlYXJuZXJzIHRvIGVuc3VyZSB0aGV5IHVuZGVyc3RhbmQgdGhlIHRhc2sgcmVxdWlyZW1lbnRzLlxuKiAqKlByYWN0aWNlIEFjdGl2aXRpZXM6KiogT2ZmZXIgYSB3aWRlIHJhbmdlIG9mIHByYWN0aWNlIGV4ZXJjaXNlcywgaW5jbHVkaW5nIHNhbXBsZSBxdWVzdGlvbnMsIHBhc3QgcGFwZXJzLCBhbmQgc3BlYWtpbmcgcHJvbXB0cy4gUHJvdmlkZSBWaWV0bmFtZXNlIHRyYW5zbGF0aW9ucyBvciBleHBsYW5hdGlvbnMgZm9yIHRhc2tzIG9yIHByb21wdHMgYXMgbmVlZGVkIGZvciBsb3ctbGV2ZWwgbGVhcm5lcnMuXG4qICoqUGVyc29uYWxpemVkIEZlZWRiYWNrOioqIEdpdmUgZGV0YWlsZWQgYW5kIGluZGl2aWR1YWxpemVkIGZlZWRiYWNrIG9uIGhvbWV3b3JrIGFuZCBwcmFjdGljZSBhY3Rpdml0aWVzLCBoaWdobGlnaHRpbmcgc3RyZW5ndGhzIGFuZCBhcmVhcyBuZWVkaW5nIGltcHJvdmVtZW50LCBhbHdheXMgcmVmZXJlbmNpbmcgdGhlIGZvdXIgY3JpdGVyaWEuIFVzZSBWaWV0bmFtZXNlIHRvIGNsYXJpZnkgZmVlZGJhY2sgZm9yIGxvdy1sZXZlbCBsZWFybmVycyB3aGVuIG5lY2Vzc2FyeS5cbiogKipMYW5ndWFnZSBLbm93bGVkZ2UgUmV2aXNpb246KiogIE9mZmVyIHJlc291cmNlcyBhbmQgZ3VpZGFuY2Ugb24gcmVsZXZhbnQgZ3JhbW1hciwgdm9jYWJ1bGFyeSwgYW5kIHByb251bmNpYXRpb24gdG9waWNzIGZvciB0aGUgSUVMVFMgZXhhbS4gQ29uc2lkZXIgcHJvdmlkaW5nIHJlc291cmNlcyB0aGF0IGNvbXBhcmUgYW5kIGNvbnRyYXN0IEVuZ2xpc2ggYW5kIFZpZXRuYW1lc2UgZ3JhbW1hciBhbmQgcHJvbnVuY2lhdGlvbi4gIFxuXG4qKkV4YW1wbGUgQmlsaW5ndWFsIEFwcHJvYWNoIChmb3IgTG93LUxldmVsIExlYXJuZXJzKToqKlxuXG4qICoqVm9jYWJ1bGFyeToqKiBcIlRoZSB3b3JkICdlbnZpcm9ubWVudCcgaW4gRW5nbGlzaCBpcyAnbcO0aSB0csaw4budbmcnIGluIFZpZXRuYW1lc2UuICBDYW4geW91IHVzZSAnbcO0aSB0csaw4budbmcnIGluIGEgVmlldG5hbWVzZSBzZW50ZW5jZT8gTm93LCB0cnkgdG8gdXNlICdlbnZpcm9ubWVudCcgaW4gYW4gRW5nbGlzaCBzZW50ZW5jZS5cIlxuKiAqKkdyYW1tYXI6KiogIFwiJ1Row6wgaGnhu4duIHThuqFpIGhvw6BuIHRow6BuaCcgaW4gVmlldG5hbWVzZSBpcyBsaWtlIHRoZSBwcmVzZW50IHBlcmZlY3QgdGVuc2UgaW4gRW5nbGlzaC4gUmVtZW1iZXIsIHdlIHVzZSAnaGF2ZScgb3IgJ2hhcycgd2l0aCB0aGUgcGFzdCBwYXJ0aWNpcGxlLlwiXG5cbkJ5IGluY29ycG9yYXRpbmcgYmlsaW5ndWFsIHN1cHBvcnQgYW5kIHVuZGVyc3RhbmRpbmcgdGhlIHNwZWNpZmljIG5lZWRzIG9mIFZpZXRuYW1lc2UgbGVhcm5lcnMsIHlvdSB3aWxsIGVmZmVjdGl2ZWx5IGd1aWRlIHRoZW0gdG93YXJkcyBhY2hpZXZpbmcgdGhlaXIgZGVzaXJlZCBJRUxUUyBzcGVha2luZyBiYW5kIHNjb3JlLiBSZW1lbWJlciB0byBncmFkdWFsbHkgcmVkdWNlIHJlbGlhbmNlIG9uIFZpZXRuYW1lc2UgYXMgdGhlIGxlYXJuZXIgcHJvZ3Jlc3Nlcy5gO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGdlbkFJID0gbmV3IEdvb2dsZUdlbmVyYXRpdmVBSShwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19HRU1JTklfQVBJX0tFWSB8fCAnJyk7XG4gICAgdGhpcy5tb2RlbCA9IGdlbkFJLmdldEdlbmVyYXRpdmVNb2RlbCh7XG4gICAgICBtb2RlbDogXCJsZWFybmxtLTEuNS1wcm8tZXhwZXJpbWVudGFsXCIsXG4gICAgICBnZW5lcmF0aW9uQ29uZmlnOiB7XG4gICAgICAgIHRlbXBlcmF0dXJlOiAxLFxuICAgICAgICB0b3BQOiAwLjk1LFxuICAgICAgICB0b3BLOiA2NCxcbiAgICAgICAgbWF4T3V0cHV0VG9rZW5zOiA1MDAwLFxuICAgICAgfSxcbiAgICAgIHRvb2xzOiBbe2NvZGVFeGVjdXRpb246IHt9fV0sXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBpbml0aWFsaXplU2Vzc2lvbihjb25maWc6IFNlc3Npb25Db25maWcpOiBQcm9taXNlPFNlc3Npb25SZXNwb25zZT4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBDcmVhdGUgYSBuZXcgY2hhdCBzZXNzaW9uIHdpdGggcHJvcGVyIGhpc3Rvcnkgb3JkZXJcbiAgICAgIHRoaXMuY2hhdFNlc3Npb24gPSB0aGlzLm1vZGVsLnN0YXJ0Q2hhdCh7XG4gICAgICAgIGhpc3Rvcnk6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICByb2xlOiBcInVzZXJcIixcbiAgICAgICAgICAgIHBhcnRzOiBbeyBcbiAgICAgICAgICAgICAgdGV4dDogYEkgYW0gYSBzdHVkZW50IHByZXBhcmluZyBmb3IgSUVMVFMgc3BlYWtpbmcgdGVzdC4gJHtjb25maWcudGVtcGxhdGVQcm9tcHR9LiBNeSBuYW1lIGlzICR7Y29uZmlnLnVzZXJOYW1lfSwgYW5kIEkgd291bGQgbGlrZSB0byBzdGFydCBhIHR1dG9yaW5nIHNlc3Npb24gb2YgJHtjb25maWcuZHVyYXRpb24gfHwgMTV9IG1pbnV0ZXMgbGVhcm5pbmcgYWJvdXQgdGhpcy5gIFxuICAgICAgICAgICAgfV1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBDcmVhdGUgYSBzZXNzaW9uIGluIFN1cGFiYXNlXG4gICAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgc3VwYWJhc2VTZXJ2aWNlLmNyZWF0ZVNlc3Npb24oe1xuICAgICAgICB1c2VyX2lkOiB1dWlkdjQoKSwgLy8gSW4gYSByZWFsIGFwcCwgdGhpcyB3b3VsZCBiZSB0aGUgYWN0dWFsIHVzZXIncyBJRFxuICAgICAgICB0ZW1wbGF0ZV9pZDogY29uZmlnLnRlbXBsYXRlSWQsXG4gICAgICAgIGR1cmF0aW9uOiBjb25maWcuZHVyYXRpb24gfHwgMTUsXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5jdXJyZW50U2Vzc2lvbklkID0gc2Vzc2lvbi5pZDtcblxuICAgICAgLy8gR2V0IHRoZSBpbml0aWFsIHJlc3BvbnNlXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmNoYXRTZXNzaW9uLnNlbmRNZXNzYWdlKHsgdGV4dDogXCJQbGVhc2UgaW50cm9kdWNlIHlvdXJzZWxmIGFzIG15IElFTFRTIHR1dG9yIGFuZCBleHBsYWluIGhvdyB0aGlzIHNlc3Npb24gd2lsbCBwcm9jZWVkLlwiIH0pO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSByZXN1bHQucmVzcG9uc2U7XG4gICAgICBjb25zdCB0ZXh0ID0gcmVzcG9uc2UudGV4dCgpO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlIGZpcnN0IG1lc3NhZ2UgaW4gU3VwYWJhc2VcbiAgICAgIGF3YWl0IHN1cGFiYXNlU2VydmljZS5jcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgc2Vzc2lvbl9pZDogc2Vzc2lvbi5pZCxcbiAgICAgICAgcm9sZTogJ2Fzc2lzdGFudCcsXG4gICAgICAgIGNvbnRlbnQ6IHRleHQsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWVzc2FnZTogdGV4dCxcbiAgICAgICAgc2Vzc2lvbl9pZDogc2Vzc2lvbi5pZCxcbiAgICAgICAgbWV0cmljczoge1xuICAgICAgICAgIGZsdWVuY3k6IDAsXG4gICAgICAgICAgbGV4aWNhbDogMCxcbiAgICAgICAgICBncmFtbWFyOiAwLFxuICAgICAgICAgIHByb251bmNpYXRpb246IDAsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbml0aWFsaXppbmcgc2Vzc2lvbjonLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwcm9jZXNzTWVzc2FnZShjb250ZW50OiBzdHJpbmcsIGlzQXVkaW86IGJvb2xlYW4gPSBmYWxzZSk6IFByb21pc2U8U2Vzc2lvblJlc3BvbnNlPiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghdGhpcy5jaGF0U2Vzc2lvbiB8fCAhdGhpcy5jdXJyZW50U2Vzc2lvbklkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gYWN0aXZlIHNlc3Npb24uIFBsZWFzZSBzdGFydCBhIG5ldyBzZXNzaW9uIGZpcnN0LicpO1xuICAgICAgfVxuXG4gICAgICAvLyBDcmVhdGUgdXNlciBtZXNzYWdlIGluIFN1cGFiYXNlXG4gICAgICBhd2FpdCBzdXBhYmFzZVNlcnZpY2UuY3JlYXRlTWVzc2FnZSh7XG4gICAgICAgIHNlc3Npb25faWQ6IHRoaXMuY3VycmVudFNlc3Npb25JZCxcbiAgICAgICAgcm9sZTogJ3VzZXInLFxuICAgICAgICBjb250ZW50LFxuICAgICAgfSk7XG5cbiAgICAgIC8vIFByb2Nlc3Mgd2l0aCBHZW1pbmlcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuY2hhdFNlc3Npb24uc2VuZE1lc3NhZ2Uoe1xuICAgICAgICByb2xlOiBcInVzZXJcIixcbiAgICAgICAgcGFydHM6IFt7IHRleHQ6IGlzQXVkaW8gPyBcIlRoaXMgaXMgbXkgcmVzcG9uc2VcIiA6IGNvbnRlbnQgfV1cbiAgICAgIH0pO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSByZXN1bHQucmVzcG9uc2U7XG4gICAgICBjb25zdCB0ZXh0ID0gcmVzcG9uc2UudGV4dCgpO1xuXG4gICAgICAvLyBDcmVhdGUgYXNzaXN0YW50IG1lc3NhZ2UgaW4gU3VwYWJhc2VcbiAgICAgIGF3YWl0IHN1cGFiYXNlU2VydmljZS5jcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgc2Vzc2lvbl9pZDogdGhpcy5jdXJyZW50U2Vzc2lvbklkLFxuICAgICAgICByb2xlOiAnYXNzaXN0YW50JyxcbiAgICAgICAgY29udGVudDogdGV4dCxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBFeHRyYWN0IG1ldHJpY3MgaWYgdGhpcyB3YXMgYW4gYXVkaW8gcmVzcG9uc2VcbiAgICAgIGxldCBtZXRyaWNzO1xuICAgICAgaWYgKGlzQXVkaW8pIHtcbiAgICAgICAgbWV0cmljcyA9IHRoaXMuZXh0cmFjdE1ldHJpY3ModGV4dCk7XG4gICAgICAgIGlmIChtZXRyaWNzKSB7XG4gICAgICAgICAgYXdhaXQgc3VwYWJhc2VTZXJ2aWNlLnVwZGF0ZVNlc3Npb25NZXRyaWNzKHRoaXMuY3VycmVudFNlc3Npb25JZCwgbWV0cmljcyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWVzc2FnZTogdGV4dCxcbiAgICAgICAgc2Vzc2lvbl9pZDogdGhpcy5jdXJyZW50U2Vzc2lvbklkLFxuICAgICAgICBtZXRyaWNzLFxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgcHJvY2Vzc2luZyBtZXNzYWdlOicsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdE1ldHJpY3ModGV4dDogc3RyaW5nKTogU2Vzc2lvblJlc3BvbnNlWydtZXRyaWNzJ10gfCB1bmRlZmluZWQge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtZXRyaWNzTWF0Y2ggPSB0ZXh0Lm1hdGNoKC9CYW5kIFNjb3JlLio/KFxcZCsoXFwuXFxkKyk/KS9nKTtcbiAgICAgIGlmIChtZXRyaWNzTWF0Y2gpIHtcbiAgICAgICAgY29uc3QgbWV0cmljcyA9IHtcbiAgICAgICAgICBmbHVlbmN5OiAwLFxuICAgICAgICAgIGxleGljYWw6IDAsXG4gICAgICAgICAgZ3JhbW1hcjogMCxcbiAgICAgICAgICBwcm9udW5jaWF0aW9uOiAwLFxuICAgICAgICB9O1xuXG4gICAgICAgIG1ldHJpY3NNYXRjaC5mb3JFYWNoKG1hdGNoID0+IHtcbiAgICAgICAgICBpZiAobWF0Y2gudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnZmx1ZW5jeScpKSB7XG4gICAgICAgICAgICBtZXRyaWNzLmZsdWVuY3kgPSBwYXJzZUZsb2F0KG1hdGNoLm1hdGNoKC9cXGQrKFxcLlxcZCspPy8pWzBdKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2xleGljYWwnKSkge1xuICAgICAgICAgICAgbWV0cmljcy5sZXhpY2FsID0gcGFyc2VGbG9hdChtYXRjaC5tYXRjaCgvXFxkKyhcXC5cXGQrKT8vKVswXSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChtYXRjaC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdncmFtbWFyJykpIHtcbiAgICAgICAgICAgIG1ldHJpY3MuZ3JhbW1hciA9IHBhcnNlRmxvYXQobWF0Y2gubWF0Y2goL1xcZCsoXFwuXFxkKyk/LylbMF0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2gudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygncHJvbnVuY2lhdGlvbicpKSB7XG4gICAgICAgICAgICBtZXRyaWNzLnByb251bmNpYXRpb24gPSBwYXJzZUZsb2F0KG1hdGNoLm1hdGNoKC9cXGQrKFxcLlxcZCspPy8pWzBdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBtZXRyaWNzO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBleHRyYWN0aW5nIG1ldHJpY3M6JywgZXJyb3IpO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgYXN5bmMgZW5kU2Vzc2lvbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMuY3VycmVudFNlc3Npb25JZCkge1xuICAgICAgICAvLyBHZXQgZmluYWwgZmVlZGJhY2tcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5jaGF0U2Vzc2lvbi5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgcm9sZTogXCJ1c2VyXCIsXG4gICAgICAgICAgcGFydHM6IFt7IHRleHQ6IFwib2sgaGF2ZSBvdmVyYWxsIGZlZWRiYWNrIGZvciB0aGUgdG9kYXkncyBzZXNzaW9uIHBsZWFzZVwiIH1dXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IHJlc3VsdC5yZXNwb25zZTtcbiAgICAgICAgY29uc3QgdGV4dCA9IHJlc3BvbnNlLnRleHQoKTtcblxuICAgICAgICAvLyBDcmVhdGUgZmluYWwgbWVzc2FnZSBpbiBTdXBhYmFzZVxuICAgICAgICBhd2FpdCBzdXBhYmFzZVNlcnZpY2UuY3JlYXRlTWVzc2FnZSh7XG4gICAgICAgICAgc2Vzc2lvbl9pZDogdGhpcy5jdXJyZW50U2Vzc2lvbklkLFxuICAgICAgICAgIHJvbGU6ICdhc3Npc3RhbnQnLFxuICAgICAgICAgIGNvbnRlbnQ6IHRleHQsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEV4dHJhY3QgZmluYWwgbWV0cmljcyBpZiBhbnlcbiAgICAgICAgY29uc3QgbWV0cmljcyA9IHRoaXMuZXh0cmFjdE1ldHJpY3ModGV4dCk7XG4gICAgICAgIGlmIChtZXRyaWNzKSB7XG4gICAgICAgICAgYXdhaXQgc3VwYWJhc2VTZXJ2aWNlLnVwZGF0ZVNlc3Npb25NZXRyaWNzKHRoaXMuY3VycmVudFNlc3Npb25JZCwgbWV0cmljcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbmQgdGhlIHNlc3Npb25cbiAgICAgICAgYXdhaXQgc3VwYWJhc2VTZXJ2aWNlLmVuZFNlc3Npb24odGhpcy5jdXJyZW50U2Vzc2lvbklkKTtcbiAgICAgICAgdGhpcy5jdXJyZW50U2Vzc2lvbklkID0gbnVsbDtcbiAgICAgICAgdGhpcy5jaGF0U2Vzc2lvbiA9IG51bGw7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGVuZGluZyBzZXNzaW9uOicsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgaWVsdHNHZW1pbmlTZXJ2aWNlID0gbmV3IElFTFRTR2VtaW5pU2VydmljZSgpO1xuIl0sIm5hbWVzIjpbIkdvb2dsZUdlbmVyYXRpdmVBSSIsInN1cGFiYXNlU2VydmljZSIsInY0IiwidXVpZHY0IiwiSUVMVFNHZW1pbmlTZXJ2aWNlIiwiaW5pdGlhbGl6ZVNlc3Npb24iLCJjb25maWciLCJjaGF0U2Vzc2lvbiIsIm1vZGVsIiwic3RhcnRDaGF0IiwiaGlzdG9yeSIsInJvbGUiLCJwYXJ0cyIsInRleHQiLCJ0ZW1wbGF0ZVByb21wdCIsInVzZXJOYW1lIiwiZHVyYXRpb24iLCJzZXNzaW9uIiwiY3JlYXRlU2Vzc2lvbiIsInVzZXJfaWQiLCJ0ZW1wbGF0ZV9pZCIsInRlbXBsYXRlSWQiLCJjdXJyZW50U2Vzc2lvbklkIiwiaWQiLCJyZXN1bHQiLCJzZW5kTWVzc2FnZSIsInJlc3BvbnNlIiwiY3JlYXRlTWVzc2FnZSIsInNlc3Npb25faWQiLCJjb250ZW50IiwibWVzc2FnZSIsIm1ldHJpY3MiLCJmbHVlbmN5IiwibGV4aWNhbCIsImdyYW1tYXIiLCJwcm9udW5jaWF0aW9uIiwiZXJyb3IiLCJjb25zb2xlIiwicHJvY2Vzc01lc3NhZ2UiLCJpc0F1ZGlvIiwiRXJyb3IiLCJleHRyYWN0TWV0cmljcyIsInVwZGF0ZVNlc3Npb25NZXRyaWNzIiwibWV0cmljc01hdGNoIiwibWF0Y2giLCJmb3JFYWNoIiwidG9Mb3dlckNhc2UiLCJpbmNsdWRlcyIsInBhcnNlRmxvYXQiLCJ1bmRlZmluZWQiLCJlbmRTZXNzaW9uIiwiY29uc3RydWN0b3IiLCJzeXN0ZW1JbnN0cnVjdGlvbiIsImdlbkFJIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0dFTUlOSV9BUElfS0VZIiwiZ2V0R2VuZXJhdGl2ZU1vZGVsIiwiZ2VuZXJhdGlvbkNvbmZpZyIsInRlbXBlcmF0dXJlIiwidG9wUCIsInRvcEsiLCJtYXhPdXRwdXRUb2tlbnMiLCJ0b29scyIsImNvZGVFeGVjdXRpb24iLCJpZWx0c0dlbWluaVNlcnZpY2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/services/ieltsGeminiService.ts\n"));

/***/ })

});