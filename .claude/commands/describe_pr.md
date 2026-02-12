 # Generate PR Description

You are tasked with generating a comprehensive pull request description following the repository's standard template (`.github/pull_request_template.md`)

## Steps to follow:

0. **Ask the user the ticket number** 
   - Ask the user for the ticket number in the format of TAM-XXX

1. **Read the PR description template:**
   - First, check if `.github/pull_request_template.md` exists
   - If it doesn't exist, inform the user that
   - Read the template carefully to understand all sections and requirements

2. **Check for existing description:**
   - Check if `thoughts/shared/prs/{number}_description.md` already exists
   - If it exists, read it and inform the user you'll be updating it
   - Consider what has changed since the last description was written

4. **Gather comprehensive diff information:**
   - Use `git diff main...HEAD` to get git diff with main branch

5. **Analyze the changes thoroughly:** (ultrathink about the code changes, their architectural implications, and potential impacts)
   - Read through the entire diff carefully
   - For context, read any files that are referenced but not shown in the diff
   - Understand the purpose and impact of each change
   - Identify user-facing changes vs internal implementation details
   - Look for breaking changes or migration requirements

6. **Handle verification requirements:**
   - Look for any checklist items in the "How to verify it" section of the template
   - For each verification step:
     - If it's a command you can run (like `make check test`, `pnpm test`, etc.), run it
     - If it passes, mark the checkbox as checked: `- [x]`
     - If it fails, keep it unchecked and note what failed: `- [ ]` with explanation
     - If it requires manual testing (UI interactions, external services), leave unchecked and note for user
   - Document any verification steps you couldn't complete

7. **Generate the description:**
   - Fill out each section from the template thoroughly:
     - Answer each question/section based on your analysis
     - Be specific about problems solved and changes made
     - Focus on user impact where relevant
     - Include technical details in appropriate sections
     - Write a concise, clear, to-the-point changelog entry
   - Ensure all checklist items are addressed (checked, explained, or removed)

8. **Save and sync the description:**
   - Write the completed description to `thoughts/shared/prs/{number}_description.md`
   - Show the user the generated description

## Important notes:
- This command works across different repositories - always read the local template
- Be thorough but concise - descriptions should be scannable
- Focus on the "why" as much as the "what"
- Include any breaking changes or migration notes prominently
- If the PR touches multiple components, organize the description accordingly
- Always attempt to run verification commands when possible
- Clearly communicate which verification steps need manual testing
