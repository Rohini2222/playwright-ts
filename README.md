# Playwright TypeScript QA Automation

A beginner-friendly Playwright TypeScript project for QA automation engineers transitioning from Java Selenium.

## ✅ Project Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```
4. Open the project in VS Code.

## 🔧 Playwright Installation

This project uses Playwright Test with TypeScript.

Install the required packages if they are not already installed:

```bash
npm install --save-dev @playwright/test @types/node
```

Then install browser binaries:

```bash
npx playwright install
```

## 🧩 MCP Setup with VS Code

Model Context Protocol (MCP) helps VS Code AI tools understand your workspace.

1. Install GitHub Copilot Chat or any supported VS Code AI extension.
2. Open your workspace in VS Code.
3. If your workspace has `.vscode/mcp.json`, keep it enabled so AI tools can use workspace metadata.
4. Use the AI assistant from VS Code to ask for code generation, refactors, or test automation guidance.

> If you don’t have an `mcp.json` file, VS Code may still support contextual AI capabilities through the installed extension.

## 🤖 GitHub Copilot Agent Setup

For a better AI-assisted workflow:

1. Install these VS Code extensions:
   - GitHub Copilot
   - GitHub Copilot Chat
2. Sign in to GitHub Copilot in VS Code.
3. Enable Copilot in your workspace and allow it to suggest code inside test files.
4. Use the Copilot Chat pane to ask for test scenarios, locators, or refactor ideas.

## ▶️ How to Run Tests

Run the full test suite from the project root:

```bash
npx playwright test
```

If you want to see the HTML report after a run:

```bash
npx playwright show-report
```

## ▶️ How to Run a Single Test in Headed Mode

Run a single file in headed mode on Chromium:

```bash
npx playwright test tests/login-flow.spec.ts --project=chromium --headed
```

Run a specific test title:

```bash
npx playwright test tests/login-flow.spec.ts --grep "login flow should authenticate user and show dashboard" --project=chromium --headed
```

## 🗂️ Folder Structure

```text
playwright-ts/
├── .vscode/
│   └── mcp.json
├── node_modules/
├── playwright.config.ts
├── package.json
├── package-lock.json
├── README.md
├── tests/
│   ├── login-flow.spec.ts
│   └── page-objects/
│       └── login-page.ts
├── playwright-report/
└── test-results/
```

## 💡 Sample Playwright Login Test

Example `tests/login-flow.spec.ts`:

```ts
import { test } from '@playwright/test';
import { LoginPage } from './page-objects/login-page';

test('login flow should authenticate user and show dashboard', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('Admin', 'admin123');
  await loginPage.expectDashboard();
});
```

Example Page Object in `tests/page-objects/login-page.ts`:

```ts
import { expect, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput;
  readonly passwordInput;
  readonly loginButton;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectDashboard() {
    await expect(this.page).toHaveURL(/dashboard/);
  }
}
```

## 🧪 Common Commands

| Command | Purpose |
|---|---|
| `npm install` | Install project dependencies |
| `npx playwright install` | Install Playwright browser binaries |
| `npx playwright test` | Run all Playwright tests |
| `npx playwright test tests/login-flow.spec.ts` | Run single test file |
| `npx playwright test --project=chromium --headed` | Run tests in headed Chromium |
| `npx playwright show-report` | Open Playwright HTML report |

## 🛠️ Useful MCP Prompts for QA Automation Engineers

- `Create a Playwright page object for the login page and add a login test.`
- `Convert this Selenium Java test to Playwright TypeScript.`
- `Add assertions to verify the dashboard page after login.`
- `Help me locate strong selectors for this web app in Playwright.`
- `Write a data-driven Playwright test for login scenarios.`
- `Refactor my Playwright test to use a page object model.`

## ⚠️ Troubleshooting

### Playwright is not found

- Make sure dependencies are installed:
  ```bash
  npm install
  npx playwright install
  ```
- Run with `npx` if global Playwright is not available.

### Test fails after login

- Check that the expected page URL or locator is correct.
- Use `page.pause()` or `--debug` to inspect the page state.
- Confirm the login credentials and target application URL are valid.

### VS Code AI / Copilot issues

- Restart VS Code after installing Copilot extensions.
- Ensure GitHub Copilot is signed in and enabled for the workspace.
- Use the Copilot Chat panel for guided automation prompts.

### Headed mode does not open browser

- Confirm the `--headed` flag is present.
- Check if your system is blocking browser launch or if the display environment is unavailable.
- Try Chromium only:
  ```bash
  npx playwright test --project=chromium --headed
  ```

## 📌 Notes for Java Selenium QA Engineers

- Playwright uses TypeScript and modern async/await patterns.
- There is no `WebDriver`; Playwright controls the browser directly.
- Page Object Model is still a good design pattern.
- Use `@playwright/test` for assertions, fixtures, and test runners.
- Playwright provides built-in reporting and tracing.

---

Happy testing! 🚀
