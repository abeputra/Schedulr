// models/EventParticipantModel.js
import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const EventParticipant = db.define('event_participants', {
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'declined'),
    defaultValue: 'pending'
  },
  responseToken: {
    type: DataTypes.STRING,
    unique: true
  }
}, {
  freezeTableName: true
});

export default EventParticipant;