const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.model');
const Role = require('../models/role.model');

router.get('/fetch/:employeeId', async (req, res) => {
    try {
        const { employeeId } = req.params;
        // Fetch the employee document
        const employee = await Employee.findOne({ id: employeeId }).populate('roleId');
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        const individualBenefits = employee.individualBenefits;
        const formattedIndividualBenefits = individualBenefits.map(benefit => ({
            name: benefit.benefitName,
            notes: benefit.notes,
        }));

        const roleBenefits = employee.roleId.benefits;
        const formattedRoleBenefits = roleBenefits.map(({ type, benefits }) => ({
            type,
            benefits: benefits.map(benefit => ({
                name: benefit.benefit,
                notes: benefit.notes,
            })),
        }));

        res.json({
            roleBenefits: formattedRoleBenefits,
            individualBenefits: formattedIndividualBenefits
        });
    } catch (error) {
        console.error('Failed to fetch benefits:', error);
        res.status(500).json({ error: 'Failed to fetch benefits' });
    }
});


router.put('/update/:employeeId', async (req, res) => {
    const { roleBenefits, individualBenefits } = req.body;
    const { employeeId } = req.params;
  
    try {
        const employee = await Employee.findOne({ id: employeeId }).populate('roleId');
        console.log(employee);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        } 

        const role = await Role.findOne({ roleId: employee.roleId.roleId });
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }

        console.log(roleBenefits);
        // Update role benefits
        role.benefits = roleBenefits.map(benefitCategory => ({
            type: benefitCategory.type,
            benefits: benefitCategory.benefits.map(benefit => ({
              benefit: benefit.benefit,
              notes: benefit.notes,
            })),
          }));
          await role.save();

        // Update individual benefits
        employee.individualBenefits = individualBenefits.map(benefit => ({
            benefitName: benefit.name,
            notes: benefit.notes,
        }));
        await employee.save();

        res.json({ message: 'Benefits updated successfully' });
    } catch (error) {
        console.error('Failed to update benefits:', error);
        res.status(500).json({ error: 'Failed to update benefits' });
    }
});

module.exports = router;