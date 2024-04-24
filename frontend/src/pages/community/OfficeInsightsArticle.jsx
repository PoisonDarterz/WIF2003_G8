import React from 'react';

const OfficeInsightsArticle = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-5xl font-bold mb-6 text-center">Office Insights: Navigating the Modern Workplace</h1>
            
            <img 
                src="/officeImage.jpg" 
                alt="Office Insights" 
                className="w-1/2 mx-auto rounded-lg mb-8 shadow-lg"
            />
            
            <div className="justify-center text-gray-700">
                <p className="justify-center mb-6">
                    <strong>Lorem ipsum dolor sit amet</strong>, consectetur adipiscing elit. Nullam non dui id nulla efficitur faucibus. 
                    Curabitur fringilla, ante vitae blandit vehicula, elit nisl posuere metus, sit amet malesuada est elit vel odio. 
                    Maecenas sit amet lorem sed turpis vestibulum gravida.
                </p>
                
                <p className="justify-center mb-6">
                    Fusce viverra lectus at augue consectetur scelerisque. Mauris quis sapien vel nunc aliquam finibus. 
                    Nulla eget luctus urna. Nam eu nulla felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices 
                    posuere cubilia curae; Duis volutpat, lectus quis consectetur ullamcorper, dui nisi condimentum ligula, 
                    sit amet iaculis odio justo sed turpis.
                </p>

                <p className="justify-center mb-6">
                    Vivamus quis libero sed ipsum efficitur sagittis. Donec sed lectus ipsum. Mauris ultricies arcu in diam tincidunt, 
                    eget facilisis tortor tincidunt. Sed sit amet elit sagittis, finibus ipsum sit amet, posuere sem. 
                    Sed feugiat ante at dolor euismod, id congue erat ultricies. In quis lacus id urna vehicula tristique.
                </p>

                <p className="justify-center mb-6">
                    Quisque aliquet, metus a suscipit ullamcorper, nisl elit rutrum neque, eget finibus neque turpis vel nunc. 
                    Integer eleifend justo eget libero efficitur, sit amet rutrum justo consectetur. Vivamus eleifend vehicula 
                    eros, eu rhoncus neque pharetra non. Nulla facilisi. Fusce efficitur urna nec ligula pellentesque, nec 
                    interdum nunc luctus.
                </p>
            </div>
        </div>
    );
};

export default OfficeInsightsArticle;
