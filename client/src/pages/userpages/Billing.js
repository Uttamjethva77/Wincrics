import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';

const Billing = () => {
  const sections = [
    { title: 'Billing & Subscriptions Policy', content: 'By subscribing to Wincrics and providing us with a payment method, you authorize us to charge you at the stated monthly fee. We will charge you immediately, and if the payment is successful, your services will be granted for the agreed-upon subscription period. For monthly subscriptions, we will charge you once for the subscription period, and your services will be active for that period. We do not continue to charge you each month. Canceling your service during a billing period will not result in any refunds or prorated discounts, and your service may continue until the end of the billing period. For seasonal packages, we will charge you once, and the services will run until the end date as specified in the package details. We reserve the right to change our membership prices at any time, which may affect existing users. We also reserve the right to adjust, transfer, migrate, terminate, or otherwise alter any subscription at any time and without notice.' },
    { title: 'Changes to Subscription Plans', content: 'Users cannot change their subscription plan via the website. If you wish to switch to a different subscription plan, you must cancel your current plan and manually initiate a new subscription for the desired plan. You will be charged immediately upon initiating the new subscription.' },
    { title: 'Refund Policy', content: 'Payments are nonrefundable. No prorated refunds will be issued for partially used periods. At our discretion, we may provide a refund or discount to any one of our members at any given time. Any refunds or discounts given do not imply or guarantee future consideration for services.' },
    { title: 'Reliance on Information Posted', content: 'Any information contained in the Services is made available solely for general information purposes. We do not warrant the accuracy, completeness, or usefulness of this information. Any reliance you place on such information is strictly at your own risk. We disclaim all liability and responsibility arising from any reliance placed on such materials by you or any other user of the Services, or by anyone who may be informed of any of its contents.' },
    { title: 'Disclaimer of Warranties', content: 'Your use of the services is at your own risk. The services are provided on an “as is” and “as available” basis, without any warranties of any kind, either express or implied. Neither Wincrics nor any person associated with Wincrics makes any warranty or representation with respect to the completeness, security, reliability, quality, accuracy, or availability of the services.' },
    { title: 'Limitation on Liability', content: 'When permitted by law, Wincrics, its affiliates, or their licensors, service providers, employees, agents, officers, or directors will not be liable for damages of any kind, under any legal theory, arising out of or in connection with your use, or inability to use, the services.' },
    { title: 'Indemnification', content: 'You agree to defend, indemnify, and hold harmless Wincrics, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys\' fees) arising out of or relating to your violation of these Terms of Use or your use of the Services.' },
    { title: 'Legality of Game of Skill', content: 'Games of skill are legal, as they are excluded from the ambit of Indian gambling legislations. Fantasy games are classified as games of skill as the success of Participants depends primarily on their superior knowledge of cricket statistics, players\' performance, and other relevant factors.' },
    { title: 'Limitation on Time to File Claims', content: 'Any cause of action or claim you may have arising out of or relating to these terms of use or the services must be commenced within one year after the cause of action accrues, otherwise, such cause of action or claim is permanently barred.' },
    { title: 'Severability', content: 'If any provision of these terms of use is held to be unenforceable, then that provision will be modified to the minimum extent necessary to make it enforceable, unless that modification is not permitted by law, in which case that provision will be disregarded.' },
    { title: 'Entire Agreement', content: 'The Terms of Use and our Privacy Policy constitute the entire understanding between you and Wincrics with respect to the Services and supersede all other agreements, whether written and oral, between you and Wincrics.' },
    { title: 'Contact Information', content: 'All communications relating to the Services should be directed to wincricsinfotech@gmail.com' },
  ];

  return (
    <Box sx={{ width: '100%', marginTop: '20px' }}>
      {sections.map((section, index) => (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit key={index}>
          <Box>
            <Typography variant="h5" paragraph>{section.title}</Typography>
            <Typography variant="body1" paragraph>{section.content}</Typography>
          </Box>
        </Slide>
      ))}
    </Box>
  );
}

export default Billing;
