# Azure Deployment Guide

This guide will walk you through deploying the VibingWithJen calculator app to Azure App Service.

## Prerequisites

- Azure account (sign up at https://azure.microsoft.com/free/ for $200 free credit)
- Git installed (you already have this)
- Azure CLI installed (optional but recommended)

## Method 1: Deploy via Azure Portal (Easiest)

### Step 1: Create an App Service

1. Go to https://portal.azure.com
2. Click **Create a resource**
3. Search for **Web App** and click **Create**
4. Fill in the details:
   - **Subscription**: Select your subscription
   - **Resource Group**: Create new (e.g., `calculator-rg`)
   - **Name**: Choose a unique name (e.g., `vibing-calculator-[yourname]`)
   - **Publish**: Code
   - **Runtime stack**: Python 3.12
   - **Region**: Choose closest to you (e.g., West US 2)
   - **Pricing plan**: 
     - **Free F1** (for testing, free)
     - **Basic B1** (recommended for learning, ~$13/month)
5. Click **Review + Create**, then **Create**

### Step 2: Configure Deployment

1. Once created, go to your App Service
2. In the left menu, find **Deployment Center**
3. Choose deployment source:
   - **GitHub**: Connect your GitHub repo (easiest)
   - **Local Git**: Push directly from your machine
   - **Azure CLI**: Deploy via command line

### Step 3: Configure Startup Command

1. In your App Service, go to **Configuration** (left menu)
2. Under **General settings** tab
3. Find **Startup Command** field
4. Enter: `gunicorn --bind=0.0.0.0 --timeout 600 app:app`
5. Click **Save**

### Step 4: Deploy Your Code

**If using GitHub:**
1. Push your code to GitHub
2. In Deployment Center, select GitHub and authorize
3. Select your repository and branch
4. Azure will automatically deploy

**If using Local Git:**
1. In Deployment Center, select Local Git
2. Copy the Git URL provided
3. In your local terminal:
   ```bash
   git remote add azure <paste-git-url-here>
   git push azure main
   ```

**If using ZIP deploy:**
1. Create a ZIP of your project files (app.py, requirements.txt, startup.txt, static/, templates/)
2. In Azure CLI:
   ```bash
   az webapp deploy --resource-group calculator-rg --name your-app-name --src-path app.zip --type zip
   ```

### Step 5: Verify Deployment

1. Go to **Overview** in your App Service
2. Click the **URL** (e.g., https://your-app-name.azurewebsites.net)
3. Your calculator should load!

## Method 2: Deploy via Azure CLI (Faster for Developers)

### Install Azure CLI

```bash
# Windows (via winget)
winget install Microsoft.AzureCLI

# Or download from https://aka.ms/installazurecliwindows
```

### Deploy Steps

```bash
# Login to Azure
az login

# Create resource group
az group create --name calculator-rg --location westus2

# Create App Service plan (Free tier)
az appservice plan create --name calculator-plan --resource-group calculator-rg --sku F1 --is-linux

# Create Web App
az webapp create --resource-group calculator-rg --plan calculator-plan --name vibing-calculator-yourname --runtime "PYTHON:3.12"

# Configure startup command
az webapp config set --resource-group calculator-rg --name vibing-calculator-yourname --startup-file "gunicorn --bind=0.0.0.0 --timeout 600 app:app"

# Deploy from local Git
az webapp deployment source config-local-git --name vibing-calculator-yourname --resource-group calculator-rg

# Get deployment credentials
az webapp deployment list-publishing-credentials --name vibing-calculator-yourname --resource-group calculator-rg --query scmUri --output tsv

# Add Azure remote and push
git remote add azure <output-from-previous-command>
git push azure main
```

## Important Notes

### File Requirements
Your deployment includes:
- ✅ `requirements.txt` - Lists Flask and gunicorn dependencies
- ✅ `app.py` - Main application (production-ready)
- ✅ `startup.txt` - Startup command for gunicorn
- ✅ `static/` - Static files (CSS, JS)
- ✅ `templates/` - HTML templates

### Known Limitations
- **In-memory history**: The calculation history uses in-memory storage, so it will reset when the app restarts. For persistent storage, you'd need to add a database (Azure SQL, CosmosDB, etc.)
- **Free tier sleeps**: F1 tier apps sleep after 20 minutes of inactivity
- **Always-on**: Only available in Basic tier and above

### Troubleshooting

**App won't start:**
1. Check logs: Go to **Log stream** in Azure Portal
2. Verify startup command is set correctly
3. Check that requirements.txt includes gunicorn

**500 errors:**
1. Check Application Insights or Log stream for errors
2. Verify all files were deployed (static/, templates/)
3. Ensure Python version matches (3.12)

### Cost Estimate

- **Free F1**: $0/month (60 min/day CPU limit)
- **Basic B1**: ~$13/month (always-on, custom domain)
- **Standard S1**: ~$70/month (auto-scaling, staging slots)

## Next Steps After Deployment

1. **Set up monitoring**: Enable Application Insights for performance tracking
2. **Add custom domain**: Configure a custom domain name (Basic tier+)
3. **Enable HTTPS**: Already enabled by default on azurewebsites.net
4. **Add authentication**: Configure Azure AD or social providers
5. **Add database**: For persistent calculation history

## Useful Commands

```bash
# View logs
az webapp log tail --name your-app-name --resource-group calculator-rg

# Restart app
az webapp restart --name your-app-name --resource-group calculator-rg

# Delete everything
az group delete --name calculator-rg --yes
```

## Additional Resources

- [Azure App Service Documentation](https://docs.microsoft.com/azure/app-service/)
- [Python on Azure App Service](https://docs.microsoft.com/azure/app-service/quickstart-python)
- [Azure Free Tier Details](https://azure.microsoft.com/free/)
