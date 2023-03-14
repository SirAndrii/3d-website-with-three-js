import React from 'react';

interface SoundSectionProps {}

const SoundSection: React.FC<SoundSectionProps> = () => {
    return (
        <div className="sound-section wrapper">
            <div className="body">
                <div className="sound-section-content content">
                    <h2 className="title">New Sound System</h2>
                    <p className="text">Feel the bass.</p>
                    <span className="description">From $41.62/mo or $999 before trade-in.</span>

                    <ul className="links">
                        <li>
                            <button className="button">Buy</button>
                        </li>
                        <li>
                            <a className={'link'}>Learn more</a>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default SoundSection;