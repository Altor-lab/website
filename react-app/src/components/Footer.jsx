import { content } from '../content'

const Footer = () => {
  return (
    <footer className="border-t border-[#21262d] bg-[#0d1117]">
      <div className="container-custom py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and copyright */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-white">{content.companyName}</span>
            <span className="text-sm text-[#6e7681]">{content.footer.copyright}</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a
              href={`mailto:${content.footer.email}`}
              className="text-[#8b949e] hover:text-white transition-colors font-mono"
            >
              {content.footer.email}
            </a>
            <a
              href={content.footer.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8b949e] hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
