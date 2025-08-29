import { session as sessionGrammy } from "grammy";

export const session = sessionGrammy({
  initial() {
    return {
      currentProfileId: 0,
    };
  },
});
