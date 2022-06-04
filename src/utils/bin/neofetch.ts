import packageJson from '../../../package.json';
import { formatDistanceToNow } from 'date-fns';

const macos = `
                    'c.
                 ,xNMM.
               .OMMMMo
               OMMM0,
     .;loddo:' loolloddol;.
   cKMMMMMMMMMMNWMMMMMMMMMM0:
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.    
 XMMMMMMMMMMMMMMMMMMMMMMMX.      
;MMMMMMMMMMMMMMMMMMMMMMMM:       
:MMMMMMMMMMMMMMMMMMMMMMMM:       
.MMMMMMMMMMMMMMMMMMMMMMMMX.      
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.    
 .XMMMMMMMMMMMMMMMMMMMMMMMMMMk   
  .XMMMMMMMMMMMMMMMMMMMMMMMMK.   
    kMMMMMMMMMMMMMMMMMMMMMMd     
     ;KMMMMMMMWXXWMMMMMMMk.      
       .cooc,.    .,coo:.        
`;

const windows = `
                                ..,
                    ....,,:;+ccllll
      ...,,+:;  cllllllllllllllllll
,cclllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
                                      
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
\`'ccllllllllll  lllllllllllllllllll
       \`' \*::  :ccllllllllllllllll
                       \`\`\`\`''*::cll
`;

const linux = `
            .-/+oossssoo+/-.               
        \`:+ssssssssssssssssss+:\`           
      -+ssssssssssssssssssyyssss+-         
    .ossssssssssssssssssdMMMNysssso.       
   /ssssssssssshdmmNNmmyNMMMMhssssss/      
  +ssssssssshmydMMMMMMMNddddyssssssss+     
 /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/    
.ssssssssdMMMNhsssssssssshNMMMdssssssss.   
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   
.ssssssssdMMMNhsssssssssshNMMMdssssssss.   
 /sssssssshNMMMyhhyyyyhdNMMMNhssssssss/    
  +sssssssssdmydMMMMMMMMddddyssssssss+     
   /ssssssssssshdmNNNNmyNMMMMhssssss/      
    .ossssssssssssssssssdMMMNysssso.
      -+sssssssssssssssssyyyssss+-
        \`:+ssssssssssssssssss+:\`
            .-/+oossssoo+/-.
`;

const getPlatform = (): 'Unknown' | 'Windows' | 'MacOS' | 'Linux' => {
  let os: 'Unknown' | 'Windows' | 'MacOS' | 'Linux' = 'Unknown';

  if (navigator.userAgent.indexOf('Win') != -1) {
    os = 'Windows';
  }

  if (navigator.userAgent.indexOf('Mac') != -1) {
    os = 'MacOS';
  }

  if (navigator.userAgent.indexOf('Linux') != -1) {
    os = 'Linux';
  }

  return os;
};

const getArt = () => {
  const platform = getPlatform();
  switch (platform) {
    case 'MacOS':
      return macos;
    case 'Windows':
      return windows;
    case 'Linux':
      return linux;
  }
};

const getInfo = () => {
  const os = getPlatform();
  const visitedAt = new Date(
    localStorage.getItem('visitedAt') || new Date().toString(),
  );
  const hostname = window.location.hostname;
  const theme = localStorage.getItem('theme');
  const resolution = `${window.screen.availWidth}x${window.screen.availHeight}`;
  const packages = Object.keys(packageJson.dependencies);
  const devPackages = Object.keys(packageJson.devDependencies);

  let message = '';

  message += `${hostname}\n`;
  const line = `${message
    .replace('\n', '')
    .split('')
    .map(() => '-')
    .join('')}\n`;

  message += `${line}\n`;
  message += `Host: ${hostname}\n`;
  message += `License: ${packageJson.license}\n`;
  message += `OS: ${os}\n`;
  message += `Packages: ${packages.length + devPackages.length} (npm)\n`;
  message += `Resolution: ${resolution}\n`;
  message += `Shell: m4tt72-web\n`;
  message += `Theme: ${theme}\n`;
  message += `Version: ${packageJson.version}\n`;
  message += `Uptime: ${formatDistanceToNow(visitedAt)}\n`;
  message += `${line}\n`;
  message += `Author: ${packageJson.author.name} (${packageJson.author.email})\n`;
  message += `Donate: <a href="https://paypal.me/y4ss1n3" target="_blank">Paypal</a>\n`;

  return message;
};

export const neofetch = async (args?: string[]): Promise<string> => {
  const art = getArt();
  const info = getInfo();

  return `
  <table>
    <tr>
      <td>${art}</td>
      <td>${info}</td>
    <tr>
  </table>
  `;
};
