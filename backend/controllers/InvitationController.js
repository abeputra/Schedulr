// // controllers/InvitationController.js
// import EventParticipant from '../models/EventParticipantModel.js';

// export const acceptInvitation = async (req, res) => {
//   try {
//     const { token } = req.query;
    
//     const participant = await EventParticipant.findOne({ 
//       where: { responseToken: token } 
//     });
    
//     if (!participant) {
//       return res.status(404).send('Undangan tidak valid');
//     }

//     await participant.update({ status: 'accepted' });
//     res.send('Undangan telah diterima');
//   } catch (error) {
//     res.status(500).send('Error');
//   }
// };

// export const declineInvitation = async (req, res) => {
//   try {
//     const { token } = req.query;
    
//     const participant = await EventParticipant.findOne({ 
//       where: { responseToken: token } 
//     });
    
//     if (!participant) {
//       return res.status(404).send('Undangan tidak valid');
//     }

//     await participant.update({ status: 'declined' });
//     res.send('Undangan telah ditolak');
//   } catch (error) {
//     res.status(500).send('Error');
//   }
// };  