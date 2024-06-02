const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.model');
const Role = require('../models/role.model');
const { authenticateUser, checkRole } = require('../middlewares/auth.middleware');

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

// Route to retrieve logged-in user's benefits
router.get('/my-benefits', authenticateUser, async (req, res) => {
    try {
        // Get the logged-in user's ID from the authentication middleware
        const userId = req.user.id;

        // Find the employee record with the user's ID and populate the required fields
        const employee = await Employee.findOne({ email: userId })
            .populate({
                path: 'roleId',
                select: 'roleName',
            })
            .populate({
                path: 'roleId',
                populate: {
                    path: 'benefits',
                    select: 'type',
                    populate: {
                        path: 'benefits',
                        select: 'benefit notes' 
                    }
                }
            })
            .populate({
                path: 'individualBenefits',
                select: 'benefitName notes' 
            });

        // Extract the role name from the employee record
        const roleName = employee.roleId ? employee.roleId.roleName : '';

        // Extract the role benefits with type, benefit name, and notes
        const roleBenefits = employee.roleId ? employee.roleId.benefits.map(type => ({
            type: type.type,
            benefits: type.benefits.map(benefit => ({
                benefit: benefit.benefit,
                notes: benefit.notes
            }))
        })) : [];

        // Extract the individual benefits with benefit name and notes
        const personalBenefits = employee.individualBenefits.map(benefit => ({
            benefit: benefit.benefitName,
            notes: benefit.notes
        }));

        // Organize the benefits data into a single JSON object
        const userBenefits = {
            roleName,
            roleBenefits,
            personalBenefits
        };

        res.json(userBenefits);
    } catch (error) {
        console.error('Failed to fetch user benefits:', error);
        res.status(500).json({ error: 'Failed to fetch user benefits' });
    }
});


module.exports = router;