const XSvg = (props) => (
	// <svg aria-hidden='true' viewBox='0 0 24 24' {...props}>
	// 	<path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
	// </svg>
	
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80">
  <defs>
    
    <filter id="shadow">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
      <feOffset in="blur" dx="3" dy="3" result="offsetBlur"/>
      <feMerge>
        <feMergeNode in="offsetBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    
    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#d0d0d0"/>
      <stop offset="100%" stop-color="#a8a8a8"/>
    </linearGradient>
  </defs>

  
  <g font-family="sans-serif" font-size="50" font-weight="900" text-anchor="middle">
    
    <text x="50%" y="50%" dy=".35em" fill="#333" opacity="0.25">SOCIO</text>
    <text x="50%" y="50%" dy=".35em" fill="#333" opacity="0.25" dx="1" >SOCIO</text>
    <text x="50%" y="50%" dy=".35em" fill="#333" opacity="0.25" dx="2" >SOCIO</text>
    <text x="50%" y="50%" dy=".35em" fill="#333" opacity="0.25" dx="3" >SOCIO</text>

   
    <text x="50%" y="50%" dy=".35em" fill="url(#grad)" filter="url(#shadow)">
      SOCIO
    </text>
  </g>
</svg>




);
export default XSvg;