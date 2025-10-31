# llms.txt File for AltorLab

## What is llms.txt?

`llms.txt` is a standardized markdown file that helps AI language models (like ChatGPT, Claude, Perplexity, Gemini) understand your website and business. When AI assistants need to answer questions about your company, they can reference this file for accurate, up-to-date information.

## Why is it Important?

With the rise of AI search engines and AI assistants, having an `llms.txt` file ensures:

1. **Accurate Recommendations:** AI assistants can accurately describe your products and services
2. **Better Visibility:** Your business can be recommended when relevant to user queries
3. **Correct Information:** AI models have access to your official company information
4. **Competitive Advantage:** Most businesses don't have this yet - you'll be ahead of the curve

## What's Included in AltorLab's llms.txt?

Our `llms.txt` file includes:

### Company Information
- Company name and tagline
- Mission statement
- Website URL
- Contact information

### Products & Services
Detailed descriptions of all 5 products:
1. **GEO (Generative Engine Optimization)**
   - Features and benefits
   - Target use cases
   
2. **SEO (Search Engine Optimization)**
   - Complete feature list
   - Key differentiators
   
3. **Paid Marketing**
   - Campaign management details
   - Platform coverage
   
4. **Reviews Management**
   - Reputation management features
   - Automation capabilities
   
5. **AI Transformation**
   - Enterprise services
   - Implementation support

### AI Insights Dashboard
- Competition analysis capabilities
- Industry insights features
- Strategy execution services

### Additional Information
- Target audience
- Key differentiators
- Use cases
- Technology platforms we work with
- Keywords for discoverability
- Company statistics

## File Location

**Development:** `react-app/public/llms.txt`  
**Production:** `https://altorlab.com/llms.txt` (after deployment)

## How AI Assistants Use It

When someone asks an AI assistant:
- "What does AltorLab do?"
- "How can I optimize for AI search?"
- "Who can help with GEO optimization?"
- "What's the difference between SEO and GEO?"

The AI can reference your `llms.txt` file to provide accurate, detailed answers and potentially recommend your services.

## Deployment

The `llms.txt` file is automatically included when you deploy:

```bash
./deploy.sh
```

After deployment, it will be accessible at:
**https://altorlab.com/llms.txt**

## Verification

After deploying, verify the file is accessible:

1. Visit: https://altorlab.com/llms.txt
2. You should see the markdown content
3. Share this URL with AI assistants for testing

## Testing with AI Assistants

You can test if AI assistants can read your file:

**Example prompts:**
- "Can you read https://altorlab.com/llms.txt and tell me what AltorLab does?"
- "Based on https://altorlab.com/llms.txt, what services does AltorLab offer?"
- "Read https://altorlab.com/llms.txt and explain the difference between their GEO and SEO services"

## Updating the File

To update the `llms.txt` file:

1. Edit: `react-app/public/llms.txt`
2. Update product descriptions, features, or company information
3. Rebuild and redeploy: `./deploy.sh`
4. Verify changes at: https://altorlab.com/llms.txt

## Best Practices

✅ **Keep it updated:** Update whenever you add new products or services  
✅ **Be comprehensive:** Include all important information AI should know  
✅ **Use clear language:** Write in plain, descriptive language  
✅ **Include keywords:** Add relevant keywords for discoverability  
✅ **Update regularly:** Keep statistics and information current  

❌ **Don't include:** Sensitive information, pricing (unless public), internal processes  

## Format

The file uses standard Markdown format:
- `#` for main headings
- `##` for sections
- `###` for subsections
- `**bold**` for emphasis
- `-` for bullet lists
- `>` for blockquotes (tagline)

## SEO Benefits

Having an `llms.txt` file also helps with:
- **AI Search Optimization:** Better visibility in AI-powered search
- **Brand Consistency:** Ensures AI assistants describe your brand accurately
- **Competitive Intelligence:** Shows you're forward-thinking and AI-native
- **Discovery:** Helps AI assistants discover and recommend your services

## Related Files

- `og-image.svg` - Social sharing image
- `index.html` - Meta tags for social sharing
- `robots.txt` - Search engine crawling instructions (if you add one)
- `sitemap.xml` - Site structure for search engines (if you add one)

## Resources

- **llms.txt Specification:** https://llmstxt.org/
- **Examples:** Check other AI-native companies' llms.txt files
- **Testing:** Use ChatGPT, Claude, or Perplexity to test your file

---

## Quick Reference

| Item | Value |
|------|-------|
| **File Location** | `react-app/public/llms.txt` |
| **Production URL** | `https://altorlab.com/llms.txt` |
| **Format** | Markdown (.txt) |
| **Size** | ~5KB |
| **Last Updated** | 2025-10-31 |
| **Auto-deployed** | Yes (via deploy.sh) |

---

**Status:** ✅ Created and ready to deploy  
**Next Step:** Run `./deploy.sh` to make it live

